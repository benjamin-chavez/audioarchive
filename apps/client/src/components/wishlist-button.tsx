// apps/client/src/components/wishlist-button.tsx

import {
  useFavoritesDispatch,
  useIsProductFavorited,
} from '@/contexts/wishlist-context';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';

function WishlistButton({ productId }: { productId: number }) {
  const dispatch = useFavoritesDispatch();
  const isFavorite: boolean = useIsProductFavorited(productId);

  const handleToggleFavorite = () => {
    const actionType = isFavorite ? 'deleted' : 'added';
    dispatch({
      type: actionType,
      productId,
    });

    // TODO: START HERE TODO: START HERE TODO: START HERE TODO: START HERE
    // TODO: START BY ADDING THE API REQUESTS TO UPDATE THE WISHLIST TABLE
    // TODO: YOU WILL NEED TO ADD THE API ROUTES AND ASSOCIATED LOGIC TO THE SERVER
  };

  return (
    <div>
      <button
        type="button"
        className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        onClick={handleToggleFavorite}
      >
        {isFavorite ? (
          <FilledHeartIcon
            className="h-6 w-6 flex-shrink-0 bg-red-500"
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
