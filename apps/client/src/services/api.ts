// apps/client/src/services/api.ts

import { RootState } from '@/lib/redux/store';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

// NEXT_PUBLIC_API_URL = 'http://localhost:5000/api'

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    // const token = (getState() as RootState).auth.token;
    // if (token) {
    //   headers.set('authentication', `Bearer ${token}`);
    // }
    // return headers;
  },
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
// export const apiSlice = createApi({
export const api = createApi({
  baseQuery: baseQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: '/' })
  // baseQuery: baseQueryWithRetry,
  // baseQuery: retry(baseQuery, { maxRetries: 6 }),

  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ['Product'],
  // tagTypes: ['Product', 'Order', 'User'],

  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
  // endpoints: (build) => ({}),
});

// export const enhancedApi = api.enhanceEndpoints({
//   endpoints: () => ({
//     getPost: () => 'test',
//   }),
// });
