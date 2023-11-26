// apps/backend/src/services/meService.ts

// TODO: YOU MIGHT WANT TO GET RID OF THIS

import {
  AppUser,
  AppUserWithProducts,
  ProductSchema,
} from '@shared/src/schemas';
import { BadRequestError, NotFoundError } from '../middleware/customErrors';
import AppUserModel from '../models/app-user.model';
import ProductService from './product.service';
import S3Service from './s3.service';
import AppUserService from './app-user.service';
import TransactionError from 'knex';

class MeService {
  static async getMe(authId: string): Promise<AppUser> {
    const appUser = await AppUserModel.findBy('authId', authId);

    if (!appUser) {
      throw new NotFoundError(`App user ${authId} not found`);
    }

    const appUserWithSignedUrls =
      await S3Service.getSignedUrlsForOneAppUser(appUser);

    return appUserWithSignedUrls;
  }

  // TODO: SHould be able to delete this
  // static async getMeWithProducts(authId: string): Promise<AppUserWithProducts> {
  //   const appUserWithProducts = await AppUserModel.getAppUserWithProducts(
  //     'authId',
  //     authId
  //   );

  //   if (!appUserWithProducts) {
  //     throw new NotFoundError(`App user ${authId} not found`);
  //   }

  //   return appUserWithProducts;
  // }

  // TODO: SHould be able to delete this
  // static async getMeWithProduct(
  //   authId: string,
  //   productId: number
  // ): Promise<AppUserWithProducts> {
  //   console.log('authId:: ', authId, 'productId:: ', productId);
  //   const appUserWithProduct = await AppUserModel.getAppUserWithProduct(
  //     'authId',
  //     authId,
  //     productId
  //   );

  //   if (!appUserWithProduct) {
  //     throw new NotFoundError(`App user ${authId} not found`);
  //   }

  //   return appUserWithProduct;
  // }

  static async updateMe(
    authId: string,
    appUserData: Partial<AppUser | null>
  ): Promise<AppUser> {
    // TODO: Add validation logic

    if (!appUserData) {
      throw new BadRequestError('Invalid appUser data provided');
    }

    const AppUser = await AppUserModel.updateByAuthId(authId, appUserData);

    if (!AppUser) {
      throw new NotFoundError('AppUser not found or failed to update');
    }

    return AppUser;
  }

  static async deleteMe(authId: string): Promise<boolean> {
    try {
      const appUser = await MeService.getMe(authId);
      const s3Keys = await AppUserModel.getAllS3Keys(appUser.id);
      await S3Service.deleteFiles(s3Keys);
      const success = await AppUserModel.deleteByAuthId(authId);

      if (!success) {
        throw new NotFoundError('AppUser not found or failed to delete');
      }

      return success;
    } catch (error) {
      // await AppUserModel.rollbackTransaction();
      throw error;
    }
  }
}

export default MeService;
