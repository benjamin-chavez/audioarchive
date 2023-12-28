// backend/src/controllers/productController.ts

import express, { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import ProductService from '../services/product.service';
import S3Service from '../services/s3.service';
import StripeService from '../services/stripe.service';
import StripeAccountService from '../services/stripe-account.service';
import axios from 'axios';

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
  async (req, res) => {
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

    // const products = {};
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

    // console.log(JSON.stringify(products, null, 2));

    res.status(200).json({
      // data: productsWithSignedUrls,
      data: products,
      message: 'Products with user details retrieved successfully',
    });
  }
);

export const getProductById: RequestHandler = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);
  // const id: number = BigInt(req.params.id);
  const product = await ProductService.getProductById(id);
  // @ts-ignore
  // product.imgS3Url = await S3Service.getObjectSignedUrl(product.imgS3Key);

  res
    .status(200)
    .json({ data: product, message: 'Product retrieved successfully' });
});

export const updateProduct: RequestHandler = asyncHandler(async (req, res) => {
  const imgFile = req.files['imgFile'][0];
  const digitalFile = req.files['digitalFile'][0];

  const productData = req.body;

  let imgS3Url;
  if (imgFile) {
    productData.imgS3Key = await S3Service.uploadFile(imgFile);
    // productData.imgS3Url = await S3Service.getObjectSignedUrl(
    //   productData.imgS3Key
    // );
    imgS3Url = await S3Service.getObjectSignedUrl(productData.imgS3Key);
  }

  // const id: number = BigInt(req.params.id);
  const id = parseInt(req.params.id, 10);
  const updatedProduct = await ProductService.updateProduct(id, productData);
  updatedProduct.imgS3Url = imgS3Url;

  console.log(`${CONTEXT}::updateProduct() - success`);
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
