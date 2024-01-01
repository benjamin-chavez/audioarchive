// apps/server/src/models/product.model.ts

import { Product } from '@shared/src/schemas';
import knex from '../config/database';

class ProductModel {
  private static tableName = 'products';

  static async create(product: Omit<Product, 'id'>): Promise<Product> {
    const results: Product[] = await knex(this.tableName)
      .insert(product)
      .returning('*');

    const newProduct = results[0];

    if (!newProduct) {
      throw new Error('Creation failed');
    }

    return newProduct;
  }

  static createBaseQuery() {
    // { filters }: { filters: any }
    return (
      knex(this.tableName)
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
          knex.raw('AVG(product_ratings.rating) as average_rating'),
          knex.raw('app_users.id as appUserId'),
          knex.raw('app_users.username')
          // knex.raw('app_users.id AS seller_id'),
          // knex.raw('app_users.username AS seller_username')
        )
        // .join('app_users', 'products.app_user_id', 'app_users.id')
        .leftJoin('appUsers', 'products.appUserId', '=', 'appUsers.id')
        .leftJoin(
          'product_ratings',
          'products.id',
          'product_ratings.product_id'
        )
        .groupBy('products.id', 'appUsers.id')
    );
  }

  static applyFiltersNew(productQuery, filters) {
    if (!filters) {
      return productQuery;
    }

    Object.entries(filters).forEach(([filterKey, filterValues]) => {
      // @ts-ignore
      if (filterValues.length > 0) {
        productQuery.whereIn(
          knex.raw('LOWER(??)', [filterKey]),
          // @ts-ignore
          filterValues.map((value) => value.toLowerCase())
        );
      }
    });

    return productQuery;
  }

  static applySearchQuery(productQuery, q, isFuzzy) {
    // if (q && typeof q === 'string') {
    // const searchQuery = q.split(' ').join(' | ');
    if (!q) {
      return productQuery;
    }

    const searchQuery = q;

    if (!isFuzzy) {
      return productQuery
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

    return (
      productQuery
        .whereRaw('products.genre_name % ?', [searchQuery])
        .orWhereRaw('products.name % ?', [searchQuery])
        .orWhereRaw('products.daw % ?', [searchQuery])
        // .orWhereRaw('products.bpm::text % ?', [searchQuery])
        .orWhereRaw('products.description % ?', [searchQuery])
        .orWhereRaw('app_users.username % ?', [searchQuery])
        .orWhereRaw('app_users.display_name % ?', [searchQuery])
    );

    // return productQuery;
  }

  static setSortAndPageParameters(sortBy, sortOrder, offser) {}

  static async fullTextSearch({
    productQuery,
    searchQuery,
    sortBy,
    order,
    minPriceNum,
    maxPriceNum,
    minBpmNum,
    maxBpmNum,
    sortByString,
    orderString,
    offset,
    limitPerPage,
    filters,
    isFuzzy = false,
  }: {
    productQuery: any;
    searchQuery: any;
    sortBy: any;
    order: any;
    minPriceNum: number;
    maxPriceNum: number;
    minBpmNum: number;
    maxBpmNum: number;
    sortByString: string;
    orderString: string;
    offset?: any;
    limitPerPage?: any;
    filters: any;
    isFuzzy?: boolean;
  }) {
    productQuery = this.applySearchQuery(productQuery, searchQuery, isFuzzy);
    productQuery = this.applyFiltersNew(productQuery, filters);

    if (sortBy && order) {
      productQuery.orderBy(sortBy, order);
    }

    const products = await productQuery
      .where('status', 'published')
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
    // .offset(offset)
    // .limit(limitPerPage);

    return products;
  }

  static async getAll(): Promise<Product[]> {
    return knex(this.tableName)
      .leftJoin('product_ratings', 'products.id', 'product_ratings.product_id')
      .select(
        'products.*',
        knex.raw('AVG(product_ratings.rating) as average_rating')
      );
  }

  static async getAllProductsWithUserDetails(): Promise<any> {
    const products = await knex(this.tableName)
      .leftJoin('appUsers', 'products.appUserId', '=', 'appUsers.id')
      .leftJoin('product_ratings', 'products.id', 'product_ratings.product_id')
      .select(
        'products.*',
        'appUsers.username',
        'appUsers.auth_id',
        knex.raw('AVG(product_ratings.rating) as average_rating')
      );

    return products;
  }

  static async getAllProductsByAppUser(appUserId: number): Promise<any> {
    const products = await knex(this.tableName)
      .leftJoin('product_ratings', 'products.id', 'product_ratings.product_id')
      .where('products.appUserId', appUserId)
      .select(
        'products.*',
        knex.raw('AVG(product_ratings.rating) as average_rating')
      )
      .groupBy('products.id');

    return products;
  }

  static async findById(id: number): Promise<Product | null> {
    const product = await knex(this.tableName)
      .leftJoin('appUsers', 'products.appUserId', '=', 'appUsers.id')
      .leftJoin('product_ratings', 'products.id', 'product_ratings.product_id')
      .where('products.id', id)
      .select(
        'products.*',
        'appUsers.username',
        knex.raw('AVG(product_ratings.rating) as average_rating')
      )
      .groupBy('products.id', 'appUsers.id')
      .first();

    return product || null;
  }

  // static async update(id: number, product: Partial<Product>): Promise<number> {
  //   const updatedProduct = {
  //     ...product,
  //     updated_at: new Date(),
  //   };

  //   return knex(this.tableName).where({ id }).update(updatedProduct);
  //   // return knex(this.tableName).where({ id }).update(product);
  // }

  static async update(
    id: number,
    product: any,
    appUserId: number
  ): Promise<number> {
    // Log the product object to debug
    // console.log(product);
    // Correct usage of set_config to set a custom configuration parameter

    await knex.raw(`SELECT set_config('app.current_app_user_id', ?, false)`, [
      appUserId.toString(),
    ]);
    let updatedRowCount;
    let updateData = product;
    // Check if the product object contains createdAt or updatedAt fields
    if (product.createdAt || product.updatedAt) {
      console.log('Removing createdAt and updatedAt fields from update object');

      const { createdAt, updatedAt, ...tmpUpdateData } = product;
      updateData = tmpUpdateData;
      // const updateUpdated = await knex(this.tableName)
      //   .where({ id })
      //   .update(updateData)
      //   .returning('*');
      // console.log('updateUpdated: ', updateUpdated);
      // return 1;
    }

    // Proceed with the update if createdAt and updatedAt fields are not present
    updatedRowCount = await knex(this.tableName)
      .where({ id })
      .update(updateData);

    await knex.raw(`SELECT set_config('app.current_app_user_id', '', false)`);

    return updatedRowCount;
  }

  static async delete(id: number): Promise<boolean> {
    const deletedRows = await knex(this.tableName).where({ id }).del();

    return deletedRows > 0;
  }
}

export default ProductModel;
