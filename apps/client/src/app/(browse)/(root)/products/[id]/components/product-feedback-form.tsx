// apps/client/src/app/(browse)/(root)/products/[id]/components/rating-form.tsx
'use client';

import RatingStars from '@/components/rating-stars';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  title: string;
  rating: number;
  comment: string;
  review: any;
  productId: number;
  reviewId?: number;
  ratingId?: number;
};

function ProductFeedbackForm({
  productId,
  rating,
  review,
  setEditableReview, // ratingId,
  // reviewId,
}: {
  productId: number;
  rating?: any;
  review?: any;
  setEditableReview: (reviewId) => void;
  // ratingId?: number;
  // reviewId?: number;
}) {
  const [userRating, setUserRating] = useState(review?.rating || 0);
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = Boolean(rating || review);

  console.log('REVIEW', review);

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      title: review?.title || '',
      rating: userRating,
      review: review,
      comment: review?.comment || '',
      productId: productId,
      ratingId: review?.ratingId,
      reviewId: review?.reviewId,
    },
  });

  useEffect(() => {
    setValue('rating', userRating);
  }, [userRating, setValue]);

  // const fetchMethod = 'POST';
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const fetchMethod = isEditMode ? 'PATCH' : 'POST';
      setIsLoading(true);
      console.log(JSON.stringify(data, null, 2));
      console.log(`/api/products/${productId}/feedback`);

      const res = await fetch(`/api/products/${productId}/feedback`, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      window.alert(`Error saving product: ${error}`);
    }

    setIsLoading(false);
    setEditableReview(null);
  };

  const handleDelete = async () => {
    try {
      const ratingId = review?.ratingId;
      const reviewId = review?.reviewId;

      if (
        (ratingId || reviewId) &&
        // TODO: Convert confirmation alert to a modal
        window.confirm('Are you sure you want to delete your Review?')
      ) {
        const res = await fetch(`/api/products/${productId}/feedback`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ratingId, reviewId }),
        });

        if (!res.ok) {
          throw new Error('Failed to submit review');
        }

        // revalidateListings();
      }
    } catch (error) {
      window.alert(`Error deleting Feedback`);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative mt-5">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0 text-gray-900"
            placeholder="Title (optional)"
            {...register('title')}
          />
        </div>
        <div className="flex items-center px-2 ">
          {' '}
          <RatingStars
            productRating={userRating}
            onChange={setUserRating}
            isEditable
          />
          <div className=" text-gray-400 pl-2">
            <p> (optional)</p>
          </div>
        </div>
        <label htmlFor="comment" className="sr-only ">
          Comment
        </label>
        <textarea
          rows={2}
          name="comment"
          id="comment"
          className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pt-2.5"
          placeholder="Add your review... (optional)"
          defaultValue={''}
          {...register('comment')}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        <div
          // space-x-3
          className="flex items-center justify-between border-t border-gray-200 px-2 py-2 sm:px-3 "
        >
          <div className="flex"></div>

          <div
            // flex-shrink-0
            className="w-full flex justify-end justify-between"
          >
            {isEditMode && (
              <button
                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            )}

            <div className="flex-grow flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 justify-self-end"
              >
                {isEditMode ? 'Save' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export { ProductFeedbackForm };
