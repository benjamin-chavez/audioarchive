// apps/client/src/app/(browse)/(root)/products/[id]/components/rating-form.tsx
'use client';

import RatingStars from '@/components/rating-stars';
import { printFormData } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  productId: number;
  title: string;
  rating: number;
  comment: string;
};

function ProductFeedbackForm({
  productId,
  rating,
}: {
  productId: number;
  rating?: any;
}) {
  const [userRating, setUserRating] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      productId: productId,
      title: '',
      rating: userRating,
      comment: '',
    },
  });

  useEffect(() => {
    setValue('rating', userRating);
  }, [userRating, setValue]);

  // const isEditMode = Boolean(rating);

  // const fetchMethod = isEditMode ? 'PUT' : 'POST';
  const fetchMethod = 'POST';
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      // setIsLoading(true);
      console.log(JSON.stringify(data, null, 2));
      console.log(`/api/products/${productId}/reviews`);

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

    // setIsLoading(false);
  };

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
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex"></div>

          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export { ProductFeedbackForm };
