// apps/server/src/controllers/search.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import knex from '../config/database';
import S3Service from '../services/s3.service';

export const searchAppUsers: RequestHandler = asyncHandler(async (req, res) => {
  const searchQuery = req.params.query;
  // console.log(searchQuery);

  const searchResults = await knex('appUsers')
    .select('*')
    .whereRaw('display_name % ?', [searchQuery])
    .orWhereRaw('username % ?', [searchQuery]);

  // console.log(searchResults);

  res.status(200).json({ data: searchResults, message: 'Search Results' });
});

export const searchProductsFuzzy: RequestHandler = asyncHandler(
  async (req, res) => {
    const searchQuery = req.params.query;
    // console.log(searchQuery);

    const products = await knex('products')
      .select(
        'products.id ',
        'products.genre_name',
        'products.name',
        'products.daw',
        'products.bpm',
        'products.price',
        'products.img_s3_key',
        'products.img_s3_url',
        'products.key',
        'products.label',
        'products.description',
        'products.digital_file_s3_key', // TODO: delete this field
        knex.raw('app_users.id as appUserId'),
        knex.raw('app_users.username')
        // knex.raw('app_users.id AS seller_id'),
        // knex.raw('app_users.username AS seller_username')
      )
      .join('app_users', 'products.app_user_id', 'app_users.id')
      .whereRaw('products.genre_name % ?', [searchQuery])
      .orWhereRaw('products.name % ?', [searchQuery])
      .orWhereRaw('products.daw % ?', [searchQuery])
      // .orWhereRaw('products.bpm::text % ?', [searchQuery])
      .orWhereRaw('products.description % ?', [searchQuery])
      .orWhereRaw('app_users.username % ?', [searchQuery])
      .orWhereRaw('app_users.display_name % ?', [searchQuery]);

    const productsWithSignedUrls =
      await S3Service.getSignedUrlsForProducts(products);

    res
      .status(200)
      .json({ data: productsWithSignedUrls, message: 'Search Results' });
  }
);

// SELECT * FROM products
// WHERE genre_name IN ('Electronic', 'Pop', 'Rock')
//   AND key = 'C Major'
//   AND bpm BETWEEN 100 AND 120;

// console.log(searchQuery);

// const filters = {
// genre: [],
// genre_name: ['Breaks', 'Bass House'],
// daw: ['Ableton'],
// key: ['F Major'],
// };

// price_bucket=1&min=500&max=1000
// bpm=1&min=120&max=130
// GET /api/products
// GET /api/products?genre=Bass House&key=F Major&bpm=120
// GET /api/products?genre=Bass House&genre=Breaks&key=F Major
// GET /api/products?genre=Bass House,Breaks&key=F Major&bpm=1&min=120&max=130

// BASE URL:
//  https://audioarchive.com/api/products

// SEARCHING:
//  GET /api/products/search?q={searchTerm}
//  GET /api/products/search?q=drumkits

// FILTERING:
//  GET /api/products/filter?category={category}&price={priceRange}&rating={rating}
//  GET /api/products/filter?category=synth&price=0-100&rating=4-5
//  GET /api/products/filter?daw=ableton&price=0-100&bpm=100-150
//  GET /api/search/products/filter?daw=ableton
//  GET /api/search/products/filter?daw=ableton&genre_name=Bass%20House
//  GET /api/search/products/filter?daw=ableton&price=0-100&bpm=100-150
//  GET /api/search/products/filter?daw=ableton&daw=flstudio&price=0-100&bpm=100-150

// SEARCH AND FILTER:
//  GET /api/products?q={searchTerm}&category={category}&price={priceRange}&rating={rating}

// PAGINATION:
//  GET /api/products?q={searchTerm}&page={pageNumber}&limit={limitPerPage}

// Sorting:
//  GET /api/products?q={searchTerm}&sort={sortBy}

// encodeURI(baseUrl) + '?query=' + encodeURIComponent(query);
/*
 * *****************
 * FULL TEXT SEARCH
 * *****************
 */
// encodeURIComponent() and decodeURIComponent()
// const searchQuery = req.params.query;
// const { category, price, bpm } = req.query;
// const { category, price, bpm } = req.query;
// const filterParams = req.params.query;
const VALID_PRODUCT_FILTERS = ['genre_name', 'daw', 'key', 'price', 'bpm'];

export const filterProducts: RequestHandler = asyncHandler(async (req, res) => {
  const { q, page, limit, sort, ...filters } = req.query;
  // console.log('q', q);
  // console.log('page', page);
  // console.log('limit', limit);
  // console.log('sort', sort);
  // console.log('filters', filters);

  let productQuery = knex('products')
    .select(
      'products.id ',
      'products.genre_name',
      'products.name',
      'products.daw',
      'products.bpm',
      'products.price',
      'products.img_s3_key',
      'products.img_s3_url',
      'products.key',
      'products.label',
      'products.description',
      'products.digital_file_s3_key',
      knex.raw('app_users.id as appUserId'),
      knex.raw('app_users.username')
      // knex.raw('app_users.id AS seller_id'),
      // knex.raw('app_users.username AS seller_username')
    )
    .join('app_users', 'products.app_user_id', 'app_users.id');

  // let fullTextQuery = productQuery.clone();
  // let fullTextQuery = JSON.parse(JSON.stringify(productQuery));

  if (q && typeof q === 'string') {
    const searchQuery = q.split(' ').join(' | ');
    // console.log(searchQuery);
    productQuery
      .whereRaw(
        `(
            to_tsvector('english', products.name) ||
            to_tsvector('english', products.genre_name) ||
            to_tsvector('english', products.bpm::text) ||
            to_tsvector('english', products.key) ||
            to_tsvector('english', app_users.display_name)
         ) || to_tsvector('english', app_users.username) @@ to_tsquery('${searchQuery}')`
      )
      .groupBy('products.id', 'app_users.id');
  }

  Object.entries(filters).forEach(([key, val]) => {
    // TODO: potentially set up the `VALID_PRODUCT_FILTERS` array to update automatically based on ts types or something

    if (!VALID_PRODUCT_FILTERS.includes(key)) {
      return res.status(400).json({ message: `Invalid filter: ${key}` });
      // return;
    }

    // TODO: Add additional type checking/validation on query params

    productQuery = Array.isArray(val)
      ? productQuery.whereIn(key, val)
      : productQuery.where(key, '=', val);
  });

  // PAGINATION
  // @ts-ignore
  const pageNumber = parseInt(page, 10) || 1;
  // @ts-ignore
  const limitPerPage = parseInt(limit, 10) || 10;
  const offset = (pageNumber - 1) * limitPerPage;

  if (typeof sort === 'string') {
    const [sortBy, sortOrder] = sort.split('__');
    productQuery.orderBy(sortBy, sortOrder === 'desc' ? 'DESC' : 'ASC');
  }

  const products = await productQuery.offset(offset).limit(limitPerPage);

  const productsWithSignedUrls =
    await S3Service.getSignedUrlsForProducts(products);

  const searchResults = productsWithSignedUrls;

  // const searchResults = products;

  res.status(200).json({ data: searchResults, message: 'Search Results' });
});

export const testQuery: RequestHandler = asyncHandler(async (req, res) => {
  const selectedFilters = {
    genre_name: [],
    key: [],
    daw: [],
  };
  console.log('tmp-controller: params', req.query);

  const { sortby, order, minPrice, maxPrice, minBpm, maxBpm, ...query } =
    req.query;

  Object.entries(query).forEach(([key, val]) => {
    let category;

    if (key === 'genres') {
      category = 'genre_name';
    } else if (key === 'daw') {
      category = 'daw';
    } else if (key === 'tonalKeys') {
      category = 'key';
    } else {
      category = key;
    }

    if (Array.isArray(val)) {
      selectedFilters[category].push(...val);
    } else {
      selectedFilters[category].push(val);
    }
  });

  function applyFilters(query, filters) {
    Object.entries(filters).forEach(([filterKey, filterValues]) => {
      // @ts-ignore
      if (filterValues.length > 0) {
        query.whereIn(
          knex.raw('LOWER(??)', [filterKey]),
          // @ts-ignore
          filterValues.map((value) => value.toLowerCase())
        );
      }
    });
  }

  // GET FILTERED PRODUCTS
  const productQuery = knex
    .select('*')
    // .select(
    //   'id',
    //   'name',
    //   'genre_name',
    //   'key',
    //   'daw',
    //   'price',
    //   'created_at',
    //   'bpm'
    // )
    .from('products');
  // .whereNot('genre_name', null);
  applyFilters(productQuery, selectedFilters);

  const sortByString = req.query.sortby ? String(req.query.sortby) : 'name';
  const orderString = req.query.order ? String(req.query.order) : 'asc';

  const minPriceNum =
    req.query.minPrice && parseInt(String(req.query.minPrice)) >= 0
      ? parseInt(String(req.query.minPrice))
      : 0;
  const maxPriceNum = req.query.maxPrice
    ? parseInt(String(req.query.maxPrice))
    : null;

  const minBpmNum =
    req.query.minBpm && parseInt(String(req.query.minBpm)) >= 0
      ? parseInt(String(req.query.minBpm))
      : 0;
  const maxBpmNum = req.query.maxBpm
    ? parseInt(String(req.query.maxBpm))
    : null;

  // const filteredProducts = await productQuery
  //   .whereBetween('price', [minPriceNum, maxPriceNum])
  //   .orderBy(sortByString, orderString);

  const filteredProducts = await productQuery
    .where('price', '>=', minPriceNum)
    .modify(function (queryBuilder) {
      if (maxPriceNum !== null) {
        queryBuilder.where('price', '<=', maxPriceNum);
      }
    })
    .modify(function (queryBuilder) {
      if (maxBpmNum !== null) {
        queryBuilder.where('bpm', '<=', maxBpmNum);
      }
    })
    .orderBy(sortByString, orderString);

  // BUILD FILTERED GENRES QUERY
  const genresQuery = knex('products').distinct('genre_name');
  // .whereNot('genre_name', null);
  applyFilters(genresQuery, selectedFilters);

  // BUILD FILTERED KEYS QUERY
  const tonalKeysQuery = knex('products').distinct('key');
  // .whereNot('genre_name', null);
  applyFilters(tonalKeysQuery, selectedFilters);

  // BUILD FILTERED DAWs QUERY
  const dawsQuery = knex('products').distinct('daw');
  // .whereNot('genre_name', null);
  applyFilters(dawsQuery, selectedFilters);

  const [genres, tonalKeys, daws] = await Promise.all([
    genresQuery.pluck('genre_name'),
    tonalKeysQuery.pluck('key'),
    dawsQuery.pluck('daw'),
  ]);

  const bpmRange = ['20', '999'];
  const priceRange = ['0', 'Max Price'];

  const productsWithSignedUrls =
    await S3Service.getSignedUrlsForProducts(filteredProducts);

  const searchResults = {
    filters: {
      genres,
      bpmRange,
      priceRange,
      tonalKeys,
      daw: daws,
    },
    products: productsWithSignedUrls,
  };

  // console.log(JSON.stringify(productsWithSignedUrls, null, 2));
  res.status(200).json({ data: searchResults, message: 'Search Results' });
});
