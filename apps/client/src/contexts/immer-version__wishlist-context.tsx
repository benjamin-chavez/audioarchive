// apps/client/src/contexts/favorites-context.tsx

import { useImmerReducer } from 'use-immer';
import { createContext, useContext, useMemo, useReducer } from 'react';

const FavoritesContext = createContext(null);

const FavoritesDispatchContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useImmerReducer(
    favoritesReducer,
    initialFavorites,
  );

  return (
    <FavoritesContext.Provider value={favorites}>
      <FavoritesDispatchContext.Provider value={dispatch}>
        {children}
      </FavoritesDispatchContext.Provider>
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function useIsProductFavorited(productId) {
  const favorites = useContext(FavoritesContext);

  return Boolean(favorites?.find((fav) => fav.productId === productId));
}

export function useFavoritesDispatch() {
  return useContext(FavoritesDispatchContext);
}

function favoritesReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        productId: action.productId,
      });
      break;
    }
    // case 'deleted': {
    //   return favorites.filter((productId) => productId !== action.productId);
    // }

    default: {
      throw Error('unknown action: ' + action.type);
    }
  }
}

// const initialFavorites = [{ 7: true }, { 21: true }, { 32: true }];
const initialFavorites = {
  7: { productId: 7 },
  21: { productId: 21 },
  32: { productId: 32 },
};
