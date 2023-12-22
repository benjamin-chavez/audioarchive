// apps/server/src/controllers/search.controller.ts

import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import knex from '../config/database';
import S3Service from '../services/s3.service';

export const searchAppUsers: RequestHandler = asyncHandler(async (req, res) => {
  const searchQuery = req.params.query;
  console.log(searchQuery);

  const searchResults = await knex('appUsers')
    .select('*')
    .whereRaw('display_name % ?', [searchQuery])
    .orWhereRaw('username % ?', [searchQuery]);

  console.log(searchResults);

  res.status(200).json({ data: searchResults, message: 'Search Results' });
});

export const searchProductsFuzzy: RequestHandler = asyncHandler(
  async (req, res) => {
    const searchQuery = req.params.query;
    // console.log(searchQuery);

    const products = await knex('products')
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
        'products.digital_file_s3_key', // TODO: delete this field
        knex.raw('app_users.id as appUserId'),
        knex.raw('app_users.username')
        // knex.raw('app_users.id AS seller_id'),
        // knex.raw('app_users.username AS seller_username')
      )
      .join('app_users', 'products.app_user_id', 'app_users.id')
      .whereRaw('products.genre_name % ?', [searchQuery])
      .orWhereRaw('products.name % ?', [searchQuery])
      .orWhereRaw('products.daw % ?', [searchQuery])
      // .orWhereRaw('products.bpm::text % ?', [searchQuery])
      .orWhereRaw('products.description % ?', [searchQuery])
      .orWhereRaw('app_users.username % ?', [searchQuery])
      .orWhereRaw('app_users.display_name % ?', [searchQuery]);

    const productsWithSignedUrls =
      await S3Service.getSignedUrlsForProducts(products);

    res
      .status(200)
      .json({ data: productsWithSignedUrls, message: 'Search Results' });
  }
);

/*
 * *****************
 * FULL TEXT SEARCH
 * *****************
 */
export const searchProducts: RequestHandler = asyncHandler(async (req, res) => {
  const searchQuery = req.params.query;
  // console.log(searchQuery);

  const products = await knex('products')
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
      'products.digital_file_s3_key', // TODO: delete this field
      knex.raw('app_users.id as appUserId'),
      knex.raw('app_users.username')
      // knex.raw('app_users.id AS seller_id'),
      // knex.raw('app_users.username AS seller_username')
    )
    .join('app_users', 'products.app_user_id', 'app_users.id')
    .whereRaw('products.genre_name % ?', [searchQuery])
    .orWhereRaw('products.name % ?', [searchQuery])
    .orWhereRaw('products.daw % ?', [searchQuery])
    // .orWhereRaw('products.bpm::text % ?', [searchQuery])
    .orWhereRaw('products.description % ?', [searchQuery])
    .orWhereRaw('app_users.username % ?', [searchQuery])
    .orWhereRaw('app_users.display_name % ?', [searchQuery]);

  console.log('products!', products);

  const productsWithSignedUrls =
    await S3Service.getSignedUrlsForProducts(products);

  // return productsWithSignedUrls;

  const searchResults = productsWithSignedUrls;
  // console.log(products);
  // const searchResults = products;

  res.status(200).json({ data: searchResults, message: 'Search Results' });
});
