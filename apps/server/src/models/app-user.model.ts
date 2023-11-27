// apps/backend/src/models/appUser.ts

import { AppUser, AppUserWithProducts, Product } from '@shared/src/schemas';
import knex from '../config/database';

class AppUserModel {
  public id: number;
  public authId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public avatarS3Key: string;
  public avatarS3Url: string;
  private static tableName = 'appUsers';

  constructor(appUser: AppUser) {
    this.id = appUser.id;
    this.authId = appUser.authId;
    this.firstName = appUser.firstName;
    this.lastName = appUser.lastName;
    this.username = appUser.username;
    this.email = appUser.email;
    // this.avatarS3Key = appUser.avatarS3Key;
    // this.avatarS3Url = appUser.avatarS3Url;
  }

  static async findAll(): Promise<AppUser[]> {
    return knex(this.tableName).select('*');
  }

  static async findBy(
    field: keyof AppUser,
    value: unknown
  ): Promise<AppUser | null> {
    const appUser: AppUser | undefined = await knex(this.tableName)
      .where({ [field]: value })
      .first();

    return appUser || null;
  }

  // static async findByAuthId(auth_id: string): Promise<AppUser | null> {
  //   const appUser: AppUser | undefined = await knex(this.tableName)
  //     .where({ auth_id })
  //     .first();

  //   return appUser || null;
  // }

  // static async findByUsername(username: string): Promise<AppUser | null> {
  //   const appUser: AppUser | undefined = await knex(this.tableName)
  //     .where({ username })
  //     .first();

  //   return appUser || null;
  // }

  // static async getAuthAppUserWithProducts(
  //   authId: string
  // ): Promise<AppUserWithProducts | null> {
  //   const appUser = await this.findByAuthId(authId);

  //   if (!appUser) {
  //     return null;
  //   }

  //   const products: Product[] = await knex('products')
  //     .where('appUserId', appUser.id)
  //     .select('*');

  //   return { appUser, products };
  // }

  // static async getAppUserWithProducts(
  //   id: number
  // ): Promise<AppUserWithProducts | null> {
  //   const appUser = await this.findById(id);

  //   if (!appUser) {
  //     return null;
  //   }

  //   const products: Product[] = await knex('products')
  //     .where('appUserId', id)
  //     .select('*');

  //   return { appUser, products };
  // }

  // TODO: SHOULD BE ABLE TO DELETE THIS
  // static async getAppUserWithProducts(
  //   // username: string
  //   field: keyof AppUser,
  //   value: unknown
  // ): Promise<AppUserWithProducts | null> {
  //   const appUser = await this.findBy(field, value);

  //   if (!appUser) {
  //     return null;
  //   }

  //   const products: Product[] = await knex('products')
  //     .where('appUserId', appUser.id)
  //     .select('*');

  //   return { appUser, products };
  // }

  static async getAppUserWithProduct(
    field: keyof AppUser,
    value: unknown,
    productId: number
    // ): Promise<AppUserWithProducts | null> {
  ): Promise<any | null> {
    const appUser = await this.findBy(field, value);

    if (!appUser) {
      return null;
    }

    const products: Product = await knex('products')
      .where('id', productId)
      .first();
    // .select('*');

    return { appUser, products };
  }

  // static async getAppUserWithProducts(
  //   id: number
  // ): Promise<AppUserWithProducts | null> {
  //   // const appUser = await this.findById(id);
  //   const appUserWithProducts = await knex(this.tableName)
  //     .join('products', `{this.tableName}.id`, '=', 'products.appUserId')
  //     .where(`${this.tableName}.id`, 'id')
  //     .select(`${this.tableName}.*`, 'products.*');

  //   if (!appUserWithProducts) {
  //     return null;
  //   }

  //   const products = result.map((row) => ({
  //     ...row, // product data
  //   }));

  //   return { user: appUser, products: products };
  // }

  static async create(appUserData: Omit<AppUser, 'id'>): Promise<AppUser> {
    const results: AppUser[] = await knex(this.tableName)
      .insert(appUserData)
      .returning('*');

    const newAppUser = results[0];

    if (!newAppUser) {
      throw new Error('Creation failed');
    }

    return newAppUser;
  }

  // TODO: maybe make this an instance method?
  // static async update(
  //   id: number,
  //   appUser: Partial<AppUser>
  // ): Promise<AppUser | null> {
  //   const results = await knex(this.tableName)
  //     .where({ id })
  //     .update(appUser)
  //     .returning('*');

  //   const updatedAppUser = results[0];

  //   return updatedAppUser || null;
  // }

  static async updateByAuthId(
    authId: string,
    appUser: Partial<AppUser>
  ): Promise<AppUser | null> {
    const results = await knex(this.tableName)
      .where({ authId: authId })
      .update(appUser)
      .returning('*');

    const updatedAppUser = results[0];

    return updatedAppUser || null;
  }

  // TODO: maybe make this an instance method?
  // static async delete(id: number): Promise<boolean> {
  //   const deletedRows = await knex(this.tableName).where({ id }).del();

  //   return deletedRows > 0;
  // }

  static async deleteByAuthId(authId: string): Promise<boolean> {
    const deletedRows = await knex(this.tableName)
      .where({ auth_id: authId })
      .del();

    return deletedRows > 0;
  }

  static async getAllS3Keys(
    // field: keyof AppUser,
    // value: unknown
    appUserid: number
  ): Promise<any> {
    const subQueryAvatar = knex('appUsers')
      .where('id', appUserid)
      .select('avatarS3Key');

    const results = await knex('products')
      .join('appUsers', 'products.appUserId', '=', 'appUsers.id')
      .where('appUsers.id', appUserid)
      .select('imgS3Key')
      .union(subQueryAvatar);

    const s3Keys = results.map((row) => Object.values(row)[0]);

    return s3Keys;
  }
}

export default AppUserModel;

// TODO: Potentially restructure the model methods so that findBy can take in a type as opposed to just having essentially duplicate routes
// static async findBy(field: 'id' | 'auth_id', value: number | string): Promise<AppUser | null> {
//   const appUser: AppUser | undefined = await knex(this.tableName)
//     .where({ [field]: value })
//     .first();

//   return appUser || null;
// }
