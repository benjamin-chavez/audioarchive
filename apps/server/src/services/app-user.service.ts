// apps/backend/src/services/appUserService.ts

import { BadRequestError, NotFoundError } from '../middleware/customErrors';
import AppUserModel from '../models/app-user.model';
import { AppUser, AppUserWithProducts, Product } from '@shared/src/schemas';
import S3Service from './s3.service';
import CustomerModel from '../models/stripe-customer.model';

class AppUserService {
  static async getAllAppUsers(): Promise<AppUser[]> {
    const appUsers = await AppUserModel.findAll();

    if (!appUsers.length) {
      throw new NotFoundError('No app users found');
    }

    const appUsersWithSignedUrls =
      await S3Service.getSignedUrlsForAppUsers(appUsers);

    return appUsersWithSignedUrls;
    // return appUsers;
  }

  // static async getAppUserById(id: number): Promise<AppUser | null> {
  //   const appUser = await AppUserModel.findById(id);
  //   if (!appUser) {
  //     throw new NotFoundError(`App user with ID ${id} not found`);
  //   }

  //   return appUser;
  // }

  // static async getAppUserByUsername(username: string): Promise<AppUser | null> {
  static async getAppUserByUsername(username: string): Promise<AppUser> {
    const appUser = await AppUserModel.findBy('username', username);
    if (!appUser) {
      throw new NotFoundError(`App user ${username} not found`);
    }

    const appUserWithSignedUrls =
      await S3Service.getSignedUrlsForOneAppUser(appUser);

    return appUserWithSignedUrls;
  }

  // static async getAppUserWithProducts(
  //   id: number
  // ): Promise<AppUserWithProducts> {
  //   const appUserWithProducts = await AppUserModel.getAppUserWithProducts(id);

  //   if (!appUserWithProducts) {
  //     throw new NotFoundError(`AppUser with ID ${id} not found`);
  //   }

  //   return appUserWithProducts;
  // }

  // TODO: SHOULD BE ABLE TO DELETE THIS
  // static async getAppUserWithProducts(
  //   username: string
  // ): Promise<AppUserWithProducts> {
  //   const appUserWithProducts = await AppUserModel.getAppUserWithProducts(
  //     'username',
  //     username
  //   );

  //   if (!appUserWithProducts) {
  //     throw new NotFoundError(`App user ${username} not found`);
  //   }

  //   return appUserWithProducts;
  // }

  static async createAppUser(appUser: Omit<AppUser, 'id'>): Promise<AppUser> {
    if (!appUser.authId || !appUser.username) {
      throw new BadRequestError(
        'App user creation requires an Auth0 ID and a username'
      );
    }

    const newAppUser = await AppUserModel.create(appUser);

    return newAppUser;
  }

  // static async updateAppUserById(
  //   id: number,
  //   appUserData: Partial<AppUser | null>
  // ): Promise<AppUser> {
  //   // TODO: Add validation logic

  //   if (!appUserData) {
  //     throw new BadRequestError('Invalid app user data provided');
  //   }

  //   const AppUser = await AppUserModel.update(id, appUserData);

  //   if (!AppUser) {
  //     throw new NotFoundError('AppUser not found or failed to update');
  //   }

  //   return AppUser;
  // }

  // static async deleteAppUserById(id: number): Promise<boolean> {
  //   const success = await AppUserModel.delete(id);

  //   if (!success) {
  //     throw new NotFoundError('AppUser not found or failed to delete');
  //   }

  //   return success;
  // }

  // static async getAllS3KeysByAuthId(authId: string): Promise<AppUser> {
  //   const appUser = await AppUserModel.findBy('authId', authId);
  //   if (!appUser) {
  //     throw new NotFoundError(`App user ${username} not found`);
  //   }

  //   return appUser;
  // }
}

export default AppUserService;
