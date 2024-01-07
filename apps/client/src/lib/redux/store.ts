// apps/client/src/lib/redux/store.ts
import {
  configureStore,
  type Action,
  type ThunkAction,
} from '@reduxjs/toolkit';
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { pokemonApi } from '@/app/(features)/pokemon/pokemon-api.slice';
import { api } from '@/services/api';
import { dogsApiSlice } from '../../app/(features)/dogs/dogs-api.slice';
import counterReducer from '../../features/counter-slice';
import { middleware } from './middleware';

// export const store = (
//   options?: ConfigureStoreOptions['preloadedState'] | undefined,
// ) =>
//   configureStore({
export const reduxStore = configureStore({
  reducer: {
    counter: counterReducer,
    [dogsApiSlice.reducerPath]: dogsApiSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(middleware)
      .concat(dogsApiSlice.middleware)
      .concat(pokemonApi.middleware);
  },
});

// setupListeners(reduxStore.dispatch);
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
