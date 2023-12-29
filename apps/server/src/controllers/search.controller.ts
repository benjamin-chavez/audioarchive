// apps/server/src/controllers/search.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import knex from '../config/database';
import S3Service from '../services/s3.service';

export const testQuery: RequestHandler = asyncHandler(async (req, res) => {
  const selectedFilters = {
    genre_name: [],
    key: [],
    daw: [],
  };
  // console.log('params', req.query);

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

export const populateFiltersAndProducts: RequestHandler = asyncHandler(
  async (req, res) => {
    const selectedFilters = {
      genre_name: [],
      key: [],
      daw: [],
    };
    console.log('params', req.query);

    // GET FILTERED PRODUCTS
    const productQuery = knex.select('*').from('products');

    const sortByString = 'name';
    const orderString = 'asc';

    const filteredProducts = await productQuery.orderBy(
      sortByString,
      orderString
    );

    // BUILD FILTERED GENRES QUERY
    const genresQuery = knex('products').distinct('genre_name');
    // .whereNot('genre_name', null);

    // BUILD FILTERED KEYS QUERY
    const tonalKeysQuery = knex('products').distinct('key');
    // .whereNot('genre_name', null);

    // BUILD FILTERED DAWs QUERY
    const dawsQuery = knex('products').distinct('daw');
    // .whereNot('genre_name', null);

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

    res.status(200).json({ data: searchResults, message: 'Search Results' });
  }
);
