// apps/server/src/models/product.model.ts

import { Product } from '@shared/src/schemas';
import knex from '../config/database';

const VALID_PRODUCT_FILTERS = ['genre_name', 'daw', 'key', 'price', 'bpm'];

class ProductModel {
  private static tableName = 'products';

  static createBaseQuery({ filters }: { filters: any }) {
    return knex('products')
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
  }

  static async fullTextSearch({
    productQuery,
    q,
    page,
    limit,
    sort,
    filters,
  }: {
    productQuery: any;
    q: any;
    page: any;
    limit: any;
    sort: any;
    filters: any;
  }) {
    if (q && typeof q === 'string') {
      const searchQuery = q.split(' ').join(' | ');
      console.log(searchQuery);
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
        // return res.status(400).json({ message: `Invalid filter: ${key}` });
        TODO: return;
      }

      // TODO: Add additional type checking/validation on query params

      productQuery = Array.isArray(val)
        ? productQuery.whereIn(key, val)
        : productQuery.where(key, '=', val);
    });

    if (typeof sort === 'string') {
      const [sortBy, sortOrder] = sort.split('__');
      productQuery.orderBy(sortBy, sortOrder === 'desc' ? 'DESC' : 'ASC');
    }

    // PAGINATION
    // @ts-ignore
    const pageNumber = parseInt(page, 10) || 1;
    // @ts-ignore
    const limitPerPage = parseInt(limit, 10) || 10;
    const offset = (pageNumber - 1) * limitPerPage;

    const products = await productQuery.offset(offset).limit(limitPerPage);
    return products;
  }

  static async getAll(): Promise<Product[]> {
    return knex(this.tableName).select('*');
  }

  static async getAllProductsWithUserDetails(): Promise<any> {
    const products = await knex(this.tableName)
      .join('appUsers', 'products.appUserId', '=', 'appUsers.id')
      .select('products.*', 'appUsers.username', 'appUsers.auth_id');

    return products;
  }

  static async getAllProductsByAppUser(appUserId: number): Promise<any> {
    const products = await knex(this.tableName)
      .where('appUserId', appUserId)
      .select('*');

    return products;
  }

  static async findById(id: number): Promise<Product | null> {
    const products = await knex(this.tableName)
      .join('appUsers', 'products.appUserId', '=', 'appUsers.id')
      .where('products.id', id)
      .select('products.*', 'appUsers.username');
    return products[0] || null;
  }

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

  // static async update(id: number, product: Partial<Product>): Promise<number> {
  //   const updatedProduct = {
  //     ...product,
  //     updated_at: new Date(),
  //   };

  //   return knex(this.tableName).where({ id }).update(updatedProduct);
  //   // return knex(this.tableName).where({ id }).update(product);
  // }

  static async update(id: number, product: any): Promise<number> {
    // Log the product object to debug
    // console.log(product);

    // Check if the product object contains createdAt or updatedAt fields
    if (product.createdAt || product.updatedAt) {
      console.log('Removing createdAt and updatedAt fields from update object');

      // Remove createdAt and updatedAt fields from the update object
      const { createdAt, updatedAt, ...updateData } = product;
      // const updateUpdated = await knex(this.tableName)
      //   .where({ id })
      //   .update(updateData)
      //   .returning('*');
      // console.log('updateUpdated: ', updateUpdated);
      // return 1;
      return knex(this.tableName).where({ id }).update(updateData);
    }

    // Proceed with the update if createdAt and updatedAt fields are not present
    return knex(this.tableName).where({ id }).update(product);
  }

  static async delete(id: number): Promise<boolean> {
    const deletedRows = await knex(this.tableName).where({ id }).del();

    return deletedRows > 0;
  }
}

export default ProductModel;
