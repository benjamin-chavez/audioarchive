/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// frontend/app/components/card.tsx
import 'server-only';

import { AppUser } from '@shared/src/schemas';
import { ProductWithAppUser } from '@shared/src/types';
import Link from 'next/link';

export default function ProductCard({
  appUser,
  product,
  productWithAppUser,
}: {
  appUser?: AppUser;
  // product: Product;
  product: ProductWithAppUser;
  productWithAppUser?: ProductWithAppUser;
}) {
  const username = product.username ? product.username : appUser?.username;

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-lg h-80 w-72">
        <div className="aspect-h-2 aspect-w-6  sm:aspect-none  h-48 ">
          <Link href={`/products/${product.id}`}>
            <img
              src={product.imgS3Url}
              alt={product.imgS3Url}
              className="h-full w-full object-cover object-center sm:h-full sm:w-full hover:opacity-75"
            />
            {/* <Image fill src={} alt={''} /> */}
          </Link>
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4 bg-white">
          <h3 className="text-sm font-medium text-gray-900 "></h3>
          <p className="text-sm text-gray-500">
            {product.software} | {product.genre}
          </p>
          <p className="text-sm text-gray-500 ">
            Producer:{' '}
            <Link href={`/${username}`} className="hover:text-blue-500">
              {username}
            </Link>
          </p>
          <div className="flex flex-1 flex-col justify-end">
            <p className="text-base font-medium text-gray-900">
              <Link
                href={`/products/${product.id}`}
                className="hover:text-blue-500"
              >
                {product.name}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
