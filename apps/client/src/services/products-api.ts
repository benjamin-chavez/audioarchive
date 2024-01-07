// apps/client/src/services/product-api.ts

// import { retry } from '@reduxjs/toolkit/query/react';
import { api } from './api';
import { Product } from '@shared/src';

type ProductsResponse = Product[];

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductsResponse, void>({
      query: () => ({ url: 'products' }),
      // keepUnusedDataFor: 5,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Products', id }) as const),
        { type: 'Products' as const, id: 'LIST' },
      ],
    }),

    getProduct: build.query<Product, number>({
      query: (productId) => `products/${productId}`,
      // query: (id) => `products/${productId}`,
      // keepUnusedDataFor: 5,
      providesTags: (_product, _err, id) => [{ types: 'Products', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
