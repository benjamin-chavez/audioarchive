// apps/client/src/app/(browse)/(root)/products/[id]/components/product-reviews-panel.tsx

import { classNames } from '@/lib/utils';
import { faqs, license, product2, reviews } from '../temp-data';
import RatingStars from '@/components/rating-stars';
import { ProductFeedbackForm } from './product-feedback-form';
import { Tab } from '@headlessui/react';

function ProductReviewsPanel({ product, productReviewData }) {
  return (
    <>
      <ProductFeedbackForm productId={product.id} />

      {/* {reviews.featured.map((review, reviewIdx) => ( */}
      {productReviewData.map((review, reviewIdx) => (
        <div key={review.id} className="flex space-x-4 text-sm text-gray-500">
          <div className="flex-none py-10">
            <img
              src={review.appUserAvatarS3Url}
              alt=""
              className="inline-block h-12 w-12 rounded-full"
            />
          </div>

          <div
            className={classNames(
              reviewIdx === 0 ? '' : 'border-t border-gray-200',
              'py-10',
            )}
          >
            <h3 className="font-medium text-gray-900">
              {/* {reviews[reviewIdx]?.author} */}
              {review.appUserDisplayName}
            </h3>
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
      ))}
    </>
  );
}
export default ProductReviewsPanel;
