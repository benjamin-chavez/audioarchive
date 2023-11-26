// backend/src/controllers/productController.ts

import express, { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import ProductService from '../services/product.service';
import S3Service from '../services/s3.service';
import StripeService from '../services/stripe.service';

export const createProduct: RequestHandler = asyncHandler(async (req, res) => {
  // @ts-ignore
  const imgFile = req.files['imgFile'][0];
  // @ts-ignore
  const digitalFile = req.files['digitalFile'][0];

  const product = req.body;

  product.imgS3Key = await S3Service.uploadFile(imgFile);
  product.digitalFileS3Key = await S3Service.uploadFile(digitalFile);
  // product.imgS3Url = await S3Service.getObjectSignedUrl(product.imgS3Key);

  const newProduct = await ProductService.addNewProduct(product);
  newProduct.imgS3Url = await S3Service.getObjectSignedUrl(product.imgS3Key);
  newProduct.stripeProductId = await StripeService.createProduct(newProduct);
  ProductService.updateProduct(newProduct.id, newProduct);

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
    const products = await ProductService.getAllProductsWithUserDetails();

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
  // TODO:
  const imgFile = req.file;
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
  productData.imgS3Url = imgS3Url;
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
