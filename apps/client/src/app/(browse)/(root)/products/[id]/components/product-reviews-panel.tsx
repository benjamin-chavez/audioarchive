// apps/client/src/app/(browse)/(root)/products/[id]/components/product-reviews-panel.tsx

import RatingStars from '@/components/rating-stars';
import { classNames } from '@/lib/utils';
import { reviews } from '../temp-data';
import { ProductFeedbackForm } from './product-feedback-form';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

function ProductReviewsPanel({ product, productReviewData }) {
  const { user } = useUser();
  console.log('user.id', user?.id);
  console.log('product', product);

  const [editableReview, setEditableReview] = useState(null);

  // console.log('prd', productReviewData);

  const handleClick = (e, reviewId) => {
    setEditableReview(reviewId);
  };

  return (
    <>
      <ProductFeedbackForm
        productId={product.id}
        setEditableReview={setEditableReview}
      />

      {/* {reviews.featured.map((review, reviewIdx) => ( */}
      {productReviewData.map((review, reviewIdx) =>
        editableReview === review.id ? (
          <div key={review.id}>
            <ProductFeedbackForm
              productId={product.id}
              review={review}
              setEditableReview={setEditableReview}
              // ratingId={review.ratingId}
              // reviewId={review.reviewId}
            />
          </div>
        ) : (
          <>
            <div
              key={review.id}
              className="flex space-x-4 text-sm text-gray-500 "
            >
              <div className="flex-none py-10">
                {/* TODO: Create Avatar Component and make sure it links to the user's profile */}
                <img
                  src={review.appUserAvatarS3Url}
                  alt=""
                  className="inline-block h-12 w-12 rounded-full"
                />
              </div>

              <div
                className={classNames(
                  reviewIdx === 0 ? '' : 'border-t border-gray-200',
                  'py-10 w-full',
                )}
              >
                <div className="flex flex-row w-full  justify-between">
                  <h3 className="font-medium text-gray-900">
                    {/* {reviews[reviewIdx]?.author} */}
                    {review.appUserDisplayName}
                  </h3>

                  {/* TODO:Make sure the IDs are set up correctly */}
                  {user?.id === review.appUserId && (
                    <button
                      className="px-2 "
                      onClick={(e) => handleClick(e, review.id)}
                    >
                      Edit
                    </button>
                  )}
                </div>
                <p>
                  <time dateTime={reviews[reviewIdx]?.datetime}>
                    {reviews[reviewIdx]?.date}
                  </time>
                </p>

                {review.rating && (
                  <RatingStars productRating={product.averageRating} />
                )}

                <div
                  className="prose prose-sm mt-4 max-w-none text-gray-500"
                  // dangerouslySetInnerHTML={{ __html: review.content }}
                  dangerouslySetInnerHTML={{ __html: review.comment }}
                />
              </div>
            </div>
          </>
        ),
      )}
    </>
  );
}
export default ProductReviewsPanel;
