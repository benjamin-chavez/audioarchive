import { classNames } from '@/lib/utils';
import { StarIcon } from '@heroicons/react/20/solid';

function RatingStars({
  productRating,
  onChange,
  isEditable = false,
}: {
  productRating: number;
  onChange?: (rating: number) => void;
  isEditable?: boolean;
}) {
  const handleUserRating = (rating) => {
    if (!isEditable || !onChange) {
      return;
    }

    const newRating = rating === productRating ? 0 : rating;
    onChange(newRating);
  };

  return (
    <>
      <div>
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                productRating > rating ? 'text-yellow-400' : 'text-gray-300',
                'h-5 w-5 flex-shrink-0',
                isEditable && 'cursor-pointer',
              )}
              aria-hidden="true"
              onClick={() => handleUserRating(rating + 1)}
            />
          ))}
        </div>
        {isEditable ? (
          <p className="sr-only">
            Set rating to {productRating} out of 5 stars
          </p>
        ) : (
          <p className="sr-only">{productRating} out of 5 stars</p>
        )}
      </div>
    </>
  );
}
export default RatingStars;
