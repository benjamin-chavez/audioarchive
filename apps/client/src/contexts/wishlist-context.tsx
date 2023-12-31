// // apps/client/src/contexts/favorites-context.tsx

// import { useUser } from '@auth0/nextjs-auth0/client';
// import { createContext, useContext, useEffect, useReducer } from 'react';

// const FavoritesContext = createContext(null);

// const FavoritesDispatchContext = createContext(null);

// export function FavoritesProvider({ children }) {
//   const [favorites, dispatch] = useReducer(favoritesReducer, {});
//   const { user } = useUser();

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await fetch(`/api/app-users/me/favorites`);
//         const { data } = await response.json();

//         const normalizedData = data.reduce((acc, fav) => {
//           acc[fav.productId] = fav;
//           return acc;
//         }, {});

//         dispatch({ type: 'initialize', favorites: normalizedData });
//       } catch (error) {
//         console.error('Failed to fetch favorites:', error);
//       }
//     };

//     user && fetchFavorites();
//     console.log('FAVORITES', favorites);
//   }, [user]);

//   return (
//     <FavoritesContext.Provider value={user ? favorites : {}}>
//       <FavoritesDispatchContext.Provider value={user ? dispatch : () => {}}>
//         {children}
//       </FavoritesDispatchContext.Provider>
//     </FavoritesContext.Provider>
//   );
// }

// export function useFavorites() {
//   return useContext(FavoritesContext);
// }

// export function useIsProductFavorited(productId) {
//   const favorites = useContext(FavoritesContext);
//   return Boolean(favorites[productId]);
// }

// export function useFavoritesDispatch() {
//   return useContext(FavoritesDispatchContext);
// }

// function favoritesReducer(favorites, action) {
//   switch (action.type) {
//     case 'initialize': {
//       return action.favorites;
//     }
//     case 'added': {
//       return {
//         ...favorites,
//         [action.productId]: { productId: action.productId },
//       };
//     }
//     case 'deleted': {
//       const newFavorites = { ...favorites };
//       delete newFavorites[action.productId];
//       return newFavorites;
//     }
//     default: {
//       throw Error('unknown action: ' + action.type);
//     }
//   }
// }
// apps/client/src/contexts/favorites-context.tsx

import { useUser } from '@auth0/nextjs-auth0/client';
import { createContext, useContext, useEffect, useReducer } from 'react';

// const FavoritesContext = createContext([]);
// const FavoritesDispatchContext = createContext(() => {});
const FavoritesContext = createContext(null);

const FavoritesDispatchContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);
  const { user } = useUser();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/app-users/me/favorites`);
        const { data } = await response.json();
        dispatch({ type: 'initialize', favorites: data });
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    user && fetchFavorites();
  }, [user]);

  return (
    <FavoritesContext.Provider value={user ? favorites : []}>
      <FavoritesDispatchContext.Provider value={user ? dispatch : () => {}}>
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
  console.log('favorites.inc', favorites);
  return favorites?.includes(productId);
}

export function useFavoritesDispatch() {
  return useContext(FavoritesDispatchContext);
}

function favoritesReducer(favorites, action) {
  switch (action.type) {
    case 'initialize': {
      return action.favorites;
    }
    case 'validate': {
      if (favorites?.length !== action.favorites?.length) {
        return action.favorites;
      }

      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i] !== action.favorites[i]) {
          return action.favorites;
        }
      }

      return favorites;
    }
    case 'added': {
      if (favorites?.includes(action.productId)) {
        return favorites;
      }
      return [...favorites, action.productId];
    }
    case 'deleted': {
      return favorites?.filter((id) => id !== action.productId);
    }
    default: {
      throw Error('unknown action: ' + action.type);
    }
  }
}
