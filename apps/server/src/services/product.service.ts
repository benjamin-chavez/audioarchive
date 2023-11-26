// backend/src/services/productService.ts

import { Product } from '@shared/src/schemas';
import { BadRequestError, NotFoundError } from '../middleware/customErrors';
import ProductModel from '../models/product.model';
import S3Service from './s3.service';

class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    return ProductModel.getAll();
  }

  static async getAllProductsWithUserDetails(): Promise<any> {
    // return ProductModel.getAllProductsWithUserDetails();

    const products = await ProductModel.getAllProductsWithUserDetails();

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
  ): Promise<Product> {
    if (!productData.name || !productData.software || !productData.appUserId) {
      throw new BadRequestError('Invalid product data provided');
    }

    // TODO: neew to add uniqueness checks
    productData.imgFile && delete productData.imgFile;
    productData.id && delete productData.id;

    const newProduct = await ProductModel.create(productData);

    return newProduct;
  }

  static async updateProduct(
    id: number,
    // productData: Partial<Product>
    productData: any
  ): Promise<Product> {
    // TODO:
    // Business logic for validation or other checks before updating.
    // if (!productData.name || !productData.software) {
    //   throw new BadRequestError('Invalid product data provided');
    // }

    delete productData.imgFile;

    const updatedRowCount = await ProductModel.update(id, productData);

    if (updatedRowCount === 0) {
      throw new NotFoundError('Product not found or failed to update');
    }

    const updatedProduct = await this.getProductById(id);
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
