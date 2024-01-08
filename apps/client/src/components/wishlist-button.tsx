// apps/client/src/components/wishlist-button.tsx
'use client';
import {
  useFavoritesDispatch,
  useIsProductFavorited,
} from '@/contexts/wishlist-context';
import { useUser } from '@auth0/nextjs-auth0/client';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

async function addFavorite(productId) {
  const res = await fetch(`/api/app-users/me/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    throw new Error('Error adding product to wishlist');
  }

  return res.json();
}

async function removeFavorite(productId) {
  const res = await fetch(`/api/app-users/me/favorites/${productId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Error removing product from wishlist');
  }

  return res.json();
}

function WishlistButton({
  productId,
  text,
}: {
  productId: number;
  text?: string;
}) {
  const dispatch = useFavoritesDispatch();
  const isFavorite: boolean = useIsProductFavorited(productId);
  const { user } = useUser();
  const router = useRouter();

  const handleToggleFavorite = async () => {
    try {
      if (!user) {
        // TODO: AFTER LOGIN, RETURN TO THIS PAGE AND ADD THE ITEM TO FAVORITES
        // TODO: REDIRECT SHOULD ACTUALLY GO TO SIGN UP PAGE
        router.push('/api/auth/login');
      }

      handleDispatch();

      const { data } = isFavorite
        ? await removeFavorite(productId)
        : await addFavorite(productId);

      dispatch({ type: 'validate', favorites: data });
    } catch (error) {
      console.error(error);
      handleDispatch();
    }
  };

  function handleDispatch() {
    dispatch({
      type: isFavorite ? 'deleted' : 'added',
      productId,
    });
  }

  return (
    <div>
      <button
        type="button"
        className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        onClick={handleToggleFavorite}
      >
        {text && <span className="pr-2">Favorite </span>}
        {isFavorite ? (
          <FilledHeartIcon
            className="h-6 w-6 flex-shrink-0 text-red-700 "
            aria-hidden="true"
          />
        ) : (
          <OutlineHeartIcon
            className="h-6 w-6 flex-shrink-0"
            aria-hidden="true"
          />
        )}
        <span className="sr-only">Add to favorites</span>
      </button>
    </div>
  );
}

export default WishlistButton;
