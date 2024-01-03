// backend/src/services/productService.ts

import { Product } from '@shared/src/schemas';
import {
  BadRequestError,
  CustomError,
  NotFoundError,
} from '../middleware/customErrors';
import ProductModel from '../models/product.model';
import S3Service from './s3.service';
import {
  processFilters,
  processLimit,
  processOffset,
  processSearchQuery,
  processSort,
} from '../lib/queryBuildingUtils';

const CONTEXT = 'ProductService';

class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    return ProductModel.getAll();
  }

  static async getAllProductsWithUserDetails({
    search,
    sortBy,
    order,
    minPrice,
    maxPrice,
    minBpm,
    maxBpm,
    page,
    limit,
    filters,
  }: {
    search: any;
    sortBy: any;
    order: any;
    minPrice: any;
    maxPrice: any;
    minBpm: any;
    maxBpm: any;
    page: any;
    limit: any;
    filters: any;
  }): Promise<any> {
    const selectedFilters = {
      genre_name: [],
      key: [],
      daw: [],
    };

    Object.entries(filters).forEach(([key, val]) => {
      let category;

      if (key === 'genres') {
        category = 'genre_name';
      } else if (key === 'daw') {
        category = 'daw';
      } else if (key === 'tonalKeys') {
        category = 'key';
      } else {
        category = key;
      }

      if (Array.isArray(val)) {
        selectedFilters[category].push(...val);
      } else {
        selectedFilters[category].push(val);
      }
    });

    let productQuery = ProductModel.createBaseQuery();

    // const processedFilters = processFilters(filters);
    const processedSearchQuery = processSearchQuery(search);

    const limitPerPage = processLimit(limit);
    const offset = processOffset(page, limitPerPage);
    // console.log('offset: ', offset);
    // console.log('limitPerPage: ', limitPerPage);

    const sortByString = sortBy ? String(sortBy) : 'name';
    const orderString = order ? String(order) : 'asc';

    const minPriceNum =
      minPrice && parseInt(String(minPrice)) >= 0
        ? parseInt(String(minPrice))
        : 0;
    const maxPriceNum = maxPrice ? parseInt(String(maxPrice)) : null;

    const minBpmNum =
      minBpm && parseInt(String(minBpm)) >= 0 ? parseInt(String(minBpm)) : 0;
    const maxBpmNum = maxBpm ? parseInt(String(maxBpm)) : null;

    let products = await ProductModel.fullTextSearch({
      productQuery,
      searchQuery: processedSearchQuery,
      sortBy,
      order,
      minPriceNum,
      maxPriceNum,
      minBpmNum,
      maxBpmNum,
      sortByString,
      orderString,
      offset,
      limitPerPage,
      filters: selectedFilters,
    });

    if (!products.length) {
      const fuzzySearchQuery = processSearchQuery(search);

      products = await ProductModel.fullTextSearch({
        productQuery,
        searchQuery: fuzzySearchQuery,
        sortBy,
        order,
        minPriceNum,
        maxPriceNum,
        minBpmNum,
        maxBpmNum,
        sortByString,
        orderString,
        offset,
        limitPerPage,
        filters: selectedFilters,
        isFuzzy: true,
      });
    }

    const productsWithSignedUrls =
      await S3Service.getSignedUrlsForProducts(products);

    return productsWithSignedUrls;
  }

  static async getAllProductsByAppUser(appUserId: number): Promise<any> {
    const products = await ProductModel.getAllProductsByAppUser(appUserId);

    const productsWithSignedUrls =
      await S3Service.getSignedUrlsForProducts(products);

    return productsWithSignedUrls;
  }

  static async getProductById(id: number): Promise<Product> {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    // @ts-ignore
    const productWithSignedUrls =
      await S3Service.getSignedUrlsForOneProduct(product);

    return productWithSignedUrls;
  }

  // type OptionalFields = { imgFile?: unknown; id?: unknown };
  // type NewProductData = Omit<Product, 'id'> & OptionalFields;
  static async addNewProduct(
    // productData: Omit<Product, 'id'>
    productData: any
    // ): Promise<Product> {
  ): Promise<any> {
    try {
      if (!productData.name || !productData.daw || !productData.appUserId) {
        throw new BadRequestError('Invalid product data provided');
      }

      // TODO: need to add uniqueness checks
      productData.imgFile && delete productData.imgFile;
      productData.id && delete productData.id;

      const newProduct = await ProductModel.create(productData);

      // console.log(`${CONTEXT}::addNewProduct - success`);
      return newProduct;
    } catch (error) {
      console.log('Errer: ', error);
      throw error;
    }
  }

  static async updateProduct(
    id: number,
    // productData: Partial<Product>
    productData: any,
    appUserId: number
  ): Promise<Product> {
    // TODO:
    // Business logic for validation or other checks before updating.
    // if (!productData.name || !productData.daw) {
    //   throw new BadRequestError('Invalid product data provided');
    // }

    delete productData.imgFile;

    const updatedRowCount = await ProductModel.update(
      id,
      productData,
      appUserId
    );

    if (updatedRowCount === 0) {
      throw new NotFoundError('Product not found or failed to update');
    }

    // TODO: Review this. Is the two db queries necesary?
    const updatedProduct = await this.getProductById(id);

    if (!updatedProduct) {
      throw new CustomError('Product not found', 404);
    }

    return updatedProduct;
  }

  static async deleteProduct(id: number): Promise<boolean> {
    // Business logic, e.g., checking if the product is still in stock or has pending orders.

    // const deletedRowCount = await ProductModel.delete(id);
    const success = await ProductModel.delete(id);

    if (!success) {
      throw new NotFoundError('Product not found or deletion failed');
    }

    return success;
  }

  // Additional methods for more complex operations can be added, such as:
  // - Calculating discounts
  // - Checking stock availability
  // - Handling product promotions or bundles
}

export default ProductService;
