// apps/backend/src/controllers/appUserController.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import AppUserService from '../services/app-user.service';
import ProductService from '../services/product.service';
import S3Service from '../services/s3.service';
import axios from 'axios';

// PUBLIC ROUTES
export const getAllAppUsers: RequestHandler = asyncHandler(async (req, res) => {
  const appUsers = await AppUserService.getAllAppUsers();

  res
    .status(200)
    .json({ data: appUsers, message: 'AppUsers retrieved succesfully' });
});

// export const getAppUserById: RequestHandler = asyncHandler(async (req, res) => {
//   const id = parseInt(req.params.id);
//   const appUser = await AppUserService.getAppUserById(id);

//   res
//     .status(200)
//     .json({ data: appUser, message: 'AppUser retrieved successfully' });
// });

export const getAppUserByUsername: RequestHandler = asyncHandler(
  async (req, res) => {
    const username = req.params.username;
    const appUser = await AppUserService.getAppUserByUsername(username);

    res
      .status(200)
      .json({ data: appUser, message: 'AppUser retrieved successfully' });
  }
);

// export const getAppUserWithProducts-OLD-using-user-id: RequestHandler = asyncHandler(
//   async (req, res) => {
//     const appUserId = parseInt(req.params.id);
//     const appUserWithProducts =
//       await AppUserService.getAppUserWithProducts(appUserId);

//     // res.status(200).json({ data: { appUser: appUser, products: products } });
//     res.status(200).json({ data: appUserWithProducts });
//   }
// );

export const getAppUserWithProducts: RequestHandler = asyncHandler(
  async (req, res) => {
    const username = req.params.username;
    const appUser = await AppUserService.getAppUserByUsername(username);
    const products = await ProductService.getAllProductsByAppUser(appUser.id);

    res.status(200).json({ data: { appUser, products } });
  }
);

export const createAppUser: RequestHandler = asyncHandler(async (req, res) => {
  let imgFile = null;
  // @ts-ignore
  if (req.files) {
    imgFile = req.files['imgFile'] ? req.files['imgFile'][0] : null;
  }

  const appUser = req.body;

  if (imgFile) {
    appUser.avatarS3Key = await S3Service.uploadFile(imgFile);
    appUser.avatarS3Url = await S3Service.getObjectSignedUrl(
      appUser?.avatarS3Key
    );
  } else {
    // const response = await axios.get(appUser.picture, {
    //   responseType: 'arraybuffer',
    // });
    // const buffer = Buffer.from(response.data, 'utf-8');
    // const pictureFile = {
    //   mimetype: response.headers['content-type'],
    //   buffer: buffer,
    // };
    // appUser.avatarS3Key = await S3Service.uploadFile(pictureFile);
    // appUser.avatarS3Url = await S3Service.getObjectSignedUrl(
    //   appUser?.avatarS3Key
    // );
    const pictureBuffer = await axios.get(appUser.picture, {
      responseType: 'arraybuffer',
    });
    const pictureFile = {
      mimetype: pictureBuffer.headers['content-type'],
      buffer: Buffer.from(pictureBuffer.data),
    };
    appUser.avatarS3Key = await S3Service.uploadFile(pictureFile);
    appUser.avatarS3Url = await S3Service.getObjectSignedUrl(
      appUser?.avatarS3Key
    );
  }

  const { picture, ...tmpAppUser } = appUser;
  // TODO: user already exists
  // const newAppUser = await AppUserService.createAppUser(appUser);
  const newAppUser = await AppUserService.createAppUser(tmpAppUser);

  res
    .status(201)
    .json({ data: newAppUser, message: 'AppUser created successfully.' });
});

// Admin Protected Routes
// export const updateAppUserById: RequestHandler = asyncHandler(
//   async (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     // const id: number = BigInt(req.params.id);
//     const updatedAppUser = await AppUserService.updateAppUserById(id, req.body);

//     res
//       .status(200)
//       .json({ data: updatedAppUser, message: 'AppUser updated successfully.' });
//   }
// );

// export const deleteAppUserById: RequestHandler = asyncHandler(
//   async (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     // const id: number = BigInt(req.params.id);
//     await AppUserService.deleteAppUserById(id);

//     // res.status(204).send();
//     res.status(200).json({ message: 'AppUser deleted successfully' });
//   }
// );
