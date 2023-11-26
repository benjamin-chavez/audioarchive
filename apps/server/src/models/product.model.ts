// apps/server/src/models/product.model.ts

import { Product } from '@shared/src/schemas';
import knex from '../config/database';

class ProductModel {
  private static tableName = 'products';

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

  static async update(id: number, product: Partial<Product>): Promise<number> {
    return knex(this.tableName).where({ id }).update(product);
  }

  static async delete(id: number): Promise<boolean> {
    const deletedRows = await knex(this.tableName).where({ id }).del();

    return deletedRows > 0;
  }
}

export default ProductModel;
