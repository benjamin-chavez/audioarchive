// apps/client/src/lib/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter-slice';
import { dogsApiSlice } from '../../app/(features)/dogs/dogs-api.slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from '@/app/(features)/pokemon/pokemon-api.slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [dogsApiSlice.reducerPath]: dogsApiSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(dogsApiSlice.middleware)
      .concat(pokemonApi.middleware);
  },
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
