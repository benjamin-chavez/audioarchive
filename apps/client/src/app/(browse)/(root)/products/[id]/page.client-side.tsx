// apps/client/src/app/products/[id]/page.client-side.tsx
// TODO: Convert this to a server component and move into `apps/client/src/app/products/[id]/page.tsx` file.
'use client';

import RatingStars from '@/components/rating-stars';
import WishlistButton from '@/components/wishlist-button';
import { useCart } from '@/contexts/cartContext';
import { CURRENCY, formatAmountForDisplay } from '@/lib/cart-calculations';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Tab } from '@headlessui/react';
import { MAX_CART_ITEM_QUANTITY } from '@shared';
import { Product, ProductWithAppUser } from '@shared/src';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
import { Button } from 'ui';
import ProductReviewsPanel from './components/product-reviews-panel';
import { faqs, license, product2 } from './temp-data';

// import { revalidateCart2 } from '../../cart/page';

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export async function handleAddToCart({
  product,
  revalidateCart,
  cartItems,
  storeCart,
  user,
}: {
  product: Product | any;
  revalidateCart: () => Promise<void>;
  cartItems: any;
  storeCart: any;
  user: any;
}) {
  // UPDATE CONTEXT

  try {
    if (user) {
      const newQuantity =
        (cartItems.find((item) => item.productId === product.id)?.quantity ||
          0) + 1;

      if (newQuantity > MAX_CART_ITEM_QUANTITY) {
        throw new Error(
          `You may only purchase ${MAX_CART_ITEM_QUANTITY} copies of this item at a time`,
        );
      }

      const res = await fetch(`/api/app-users/me/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: newQuantity,
        }),
      });

      if (!res.ok) {
        throw new Error('Problem adding item to cart');
      }

      const {
        data: { items: updatedCart },
      } = await res.json();
      console.log('updatedCart', updatedCart);
      storeCart(updatedCart);

      // TODO: NEED TO REVALIDATE CACHE
      // await revalidateCart();
      // await revalidateCart2();
      // await revalidateCart2();
      return updatedCart;
    } else {
      // const existingCartItem = cartItems.find(
      //   (item) => item.productId === product.id,
      // );

      const existingCartItemIdx = cartItems.findIndex(
        (item) => item.productId === product.id,
      );

      let updatedCart;
      if (existingCartItemIdx !== -1) {
        const newQuantity = (cartItems[existingCartItemIdx].quantity += 1);
        if (newQuantity > MAX_CART_ITEM_QUANTITY) {
          throw new Error(
            `You may only purchase ${MAX_CART_ITEM_QUANTITY} copies of this item at a time`,
          );
        }

        updatedCart = [...cartItems];
        updatedCart[existingCartItemIdx].quantity = newQuantity;
      } else {
        const newCartItem = {
          quantity: 1,
          cartItemCreatedAt: new Date(),
          productId: product.id,
          name: product.name,
          genre: product.genre,
          daw: product.daw,
          bpm: product.bpm,
          price: product.price,
          imgS3Key: product.imgS3Key,
          imgS3Url: product.imgS3Url,
          sellerId: product.appUserId,
          sellerUsername: product.name,
        };
        updatedCart = [...cartItems, newCartItem];
      }

      storeCart(updatedCart);
    }
  } catch (error) {
    // TODO: Make the alert prettier
    alert(error);
    console.error('Failed to add item to cart:', error);
  }
}

export default function PageClient({
  product,
  revalidateCart,
  productReviewData = [],
}: {
  product: ProductWithAppUser | any;
  revalidateCart: () => Promise<void>;
  productReviewData: any;
}) {
  const searchParams = useSearchParams();
  const customReferrer = searchParams.get('ref');
  const { cartItems, storeCart } = useCart();
  const { user } = useUser();

  // TODO: Make sure that auth0 appUserIds are updated to match the local db otherwise this won't work.
  const isProductSeller = user && user.id === product.appUserId;
  // console.log('user.id', user?.id);
  // console.log('product.appUserId', product?.appUserId);

  return (
    <div className="bg-white">
      <div
        // py-16
        // sm:py-24
        className="mx-auto px-4 sm:py-16 py-8 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div
          // mt-10
          className="flex flex-row w-full justify-between"
        >
          {/* TODO: POTENTIALLY REWRITE THE BROWSER HISTORY SO THAT WHEN YOU GET "BACK" TO ALL PRODUCTS THE BROWSER HAS A FORWARD NAVIGATION OPTION BACK TO THIS PAGE */}
          <Link
            href={
              customReferrer ? decodeURIComponent(customReferrer) : '/products'
            }
            className="bg-blue-500  px-4 "
          >
            Back to Products
          </Link>
          {isProductSeller && (
            // TODO: Refactor after you write the Button Component
            <Button className="bg-blue-500  px-4 ">
              <Link href={`/dashboard/products/edit/${product.id}`}>Edit</Link>
            </Button>
          )}
        </div>
        {/* Product */}

        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16 py-0 sm:py-8 ">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.imgS3Url}
                alt={product.imgS3Url}
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  <Link
                    href={`/${product.username}`}
                    className="hover:text-blue-500"
                  >
                    {product.username}
                  </Link>
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  <Link
                    className="hover:text-blue-500"
                    href={`/products?daw=${product.daw}`}
                  >
                    {product.daw}
                  </Link>{' '}
                  |{' '}
                  <Link
                    className="hover:text-blue-500"
                    href={`/products?genres=${product.genreName}`}
                  >
                    {product.genreName}
                  </Link>{' '}
                </p>
              </div>

              <RatingStars productRating={product.averageRating} />
            </div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {formatAmountForDisplay(product.price, CURRENCY)}
              </p>
            </div>

            <p className="mt-6 text-gray-500">{product2.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                onClick={() =>
                  handleAddToCart({
                    product: product,
                    cartItems,
                    storeCart,
                    user,
                    revalidateCart,
                  })
                }
              >
                Add to Cart
              </button>
              {/* <a
                // type="button"
                href={product.digitalFileS3Url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Download
              </a> */}

              {/* TODO: UPDATE STYLING OF FAVORRITE BUTTON */}
              <WishlistButton productId={product.id} text={'Favorite'} />
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Plugins</h3>
              <div className="prose prose-sm mt-4 text-gray-500">
                <ul role="list">
                  {product2.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">License</h3>
              <p className="mt-4 text-sm text-gray-500">
                {license.summary}{' '}
                <a
                  href={license.href}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Read full license
                </a>
              </p>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Share</h3>
              <ul role="list" className="mt-4 flex items-center space-x-6">
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Facebook</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Instagram</span>
                    <svg
                      className="h-6 w-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Twitter</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <Tab.Group as="div">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                      )
                    }
                  >
                    Customer Reviews
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                      )
                    }
                  >
                    FAQ
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
                      )
                    }
                  >
                    License
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="">
                  <h3 className="sr-only">Customer Reviews</h3>
                </Tab.Panel>
                <ProductReviewsPanel
                  product={product}
                  productReviewData={productReviewData}
                />

                <Tab.Panel className="text-sm text-gray-500">
                  <h3 className="sr-only">Frequently Asked Questions</h3>

                  <dl>
                    {faqs.map((faq) => (
                      <Fragment key={faq.question}>
                        <dt className="mt-10 font-medium text-gray-900">
                          {faq.question}
                        </dt>
                        <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                          <p>{faq.answer}</p>
                        </dd>
                      </Fragment>
                    ))}
                  </dl>
                </Tab.Panel>

                <Tab.Panel className="pt-10">
                  <h3 className="sr-only">License</h3>

                  <div
                    className="prose prose-sm max-w-none text-gray-500"
                    dangerouslySetInnerHTML={{ __html: license.content }}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
