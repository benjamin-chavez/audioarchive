// backend/src/controllers/productController.ts

import express, { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import ProductService from '../services/product.service';
import S3Service from '../services/s3.service';
import StripeService from '../services/stripe.service';
import { ProductRatingService } from '../services/product-rating.service';
import StripeAccountService from '../services/stripe-account.service';
import axios from 'axios';
import { CustomError } from '../middleware/customErrors';
import { Product } from '@shared/src/schemas';
import MeService from '../services/me.service';
import { processOffset } from '../lib/queryBuildingUtils';
import knex from '../config/database';

const CONTEXT = 'ProductController';

export const createProduct: RequestHandler = asyncHandler(async (req, res) => {
  const imgFile = req.files['imgFile'][0];
  const product = req.body;
  if (imgFile) {
    const digitalFile = req.files['digitalFile'][0];

    product.imgS3Key = await S3Service.uploadFile(imgFile);
    product.digitalFileS3Key = await S3Service.uploadFile(digitalFile);

    // TODO: Refactor this to make fewer db calls
    // const stripeAccount =
    //   await StripeAccountService.getAllStripeAccountsByAppUser(product.appUserId);
    // product.accountId = stripeAccount[0].id;

    //    const newProduct = await ProductService.addNewProduct(product);
    //    console.log('product.imgS3Key: ', product.imgS3Key);
    //    newProduct.imgS3Url = await S3Service.getObjectSignedUrl(product.imgS3Key);

    // newProduct.stripeProductId = await StripeService.createProduct(newProduct);

    // await ProductService.updateProduct(newProduct.id, newProduct);
  } else {
    const pictureBuffer = await axios.get(product.imageUrl, {
      responseType: 'arraybuffer',
    });
    const pictureFile = {
      mimetype: pictureBuffer.headers['content-type'],
      buffer: Buffer.from(pictureBuffer.data),
    };
    product.imgS3Key = await S3Service.uploadFile(pictureFile);
  }

  const newProduct = await ProductService.addNewProduct(product);
  console.log('product.imgS3Key: ', product.imgS3Key);
  newProduct.imgS3Url = await S3Service.getObjectSignedUrl(product.imgS3Key);
  console.log(`${CONTEXT}::createProduct() - success`);

  res
    .status(201)
    .json({ data: newProduct, message: 'Product created successfully' });
});

/* GET /api/products - Get all Products (Public) */
// export const getAllProducts: RequestHandler = asyncHandler(async (req, res) => {
//   const products = await ProductService.getAllProducts();

//   res
//     .status(200)
//     .json({ data: products, message: 'Products retrieved successfully' });
// });

export const getAllProductsWithUserDetails: RequestHandler = asyncHandler(
  async (req, res, next) => {
    // if (req.query.cursor) {
    //   return getAllProductsWithUserDetailsCursor(req, res, next);
    // }
    // const { search, page, limit, sort, ...filters } = req.query;
    const {
      search,
      sortby,
      order,
      minPrice,
      maxPrice,
      minBpm,
      maxBpm,
      page,
      limit,
      ...filters
      // ...query
    } = req.query;

    console.log('params', req.query);
    // await ProductService.searchAndFilterProducts

    const products = await ProductService.getAllProductsWithUserDetails({
      sortBy: sortby,
      order,
      minPrice,
      maxPrice,
      minBpm,
      maxBpm,
      page,
      limit,
      filters,
      search,
    });

    res.status(200).json({
      data: products,
      message: 'Products with user details retrieved successfully',
      hasMore: true,
    });
  }
);

export const getAllProductsWithUserDetailsCursor: RequestHandler = asyncHandler(
  async (req, res) => {
    try {
      const limit = 10;
      let { cursor } = req.query;

      console.log('params0', req.query);

      let query = knex('products').orderBy('id').limit(limit);

      if (cursor) {
        query = query.where('id', '>', cursor);
      }

      const products = await query;

      // console.log('products', products);
      const nextCursor =
        products?.length === limit ? products[products?.length - 1].id : null;

      res.status(200).json({
        data: products,
        message: 'Products with user details retrieved successfully',
        // hasMore: true,
        nextCursor: nextCursor,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching products', error: error.message });
    }
  }
);

export const getFeaturedProducts: RequestHandler = asyncHandler(
  async (req, res) => {
    const id = parseInt(req.params.id, 10);
    // const id: number = BigInt(req.params.id);
    const product = await ProductService.getFeaturedProducts();
    // @ts-ignore
    // product.imgS3Url = await S3Service.getObjectSignedUrl(product.imgS3Key);

    res.status(200).json({
      data: product,
      message: 'Featured products retrieved successfully',
    });
  }
);

export const getProductById: RequestHandler = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  // const id: number = BigInt(req.params.id);
  const product = await ProductService.getProductById(id);
  // @ts-ignore
  // product.imgS3Url = await S3Service.getObjectSignedUrl(product.imgS3Key);

  res.status(200).json({
    data: product,
    message: 'Product retrieved successfully',
  });
});

export const updateProduct: RequestHandler = asyncHandler(async (req, res) => {
  const imgFile = req.files['imgFile']?.[0];
  // const digitalFile = req.files['digitalFile']?.[0];

  const { appUserId, digitalFile, ...productData } = req.body;
  console.log('productData', productData);
  // const {
  //   appUserId,
  //   ...productData
  // }: { appUserId: number; productData: Partial<Product> } = req.body;

  let imgS3Url;
  if (imgFile) {
    productData.imgS3Key = await S3Service.uploadFile(imgFile);
    // productData.imgS3Url = await S3Service.getObjectSignedUrl(
    //   productData.imgS3Key
    // );
    imgS3Url = await S3Service.getObjectSignedUrl(productData.imgS3Key);
  }

  if (digitalFile) {
    productData.digitalFileS3Key = await S3Service.uploadFile(digitalFile);
  }

  // const id: number = BigInt(req.params.id);
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    throw new CustomError('Invalid product ID', 400);
  }

  const updatedProduct = await ProductService.updateProduct(
    id,
    productData,
    appUserId
  );

  updatedProduct.imgS3Url = imgS3Url;

  res
    .status(200)
    .json({ data: updatedProduct, message: 'Product updated successfully' });
});

export const deleteProduct: RequestHandler = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  // const id: number = BigInt(req.params.id);
  await ProductService.deleteProduct(id);

  // res.status(204).send();
  res.status(200).json({ message: 'Product deleted successfully' });
});
