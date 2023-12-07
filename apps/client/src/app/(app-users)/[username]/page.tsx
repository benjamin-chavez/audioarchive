/* eslint-disable @next/next/no-img-element */
// src/app/users/[user]/page.tsx

import 'server-only';

import ProductsGrid from '../../../components/products-grid';
import { getAppUserWProducts } from '@/lib/data/app-user';
import Image from 'next/image';
import Container from '@/components/container';

type AppUserProps = {
  params: { username: string };
};

export default async function UserDetail({ params }: AppUserProps) {
  let res = await getAppUserWProducts(params.username);
  const { appUser, products } = res.data;

  return (
    <>
      <div>
        <img
          className="h-64 w-full object-cover lg:h-48"
          src={
            'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
          }
          alt=""
        />
      </div>
      <Container>
        <div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <Image
                  className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56 object-cover ring-4 ring-white"
                  width={500}
                  height={500}
                  quality={100}
                  src={appUser.avatarS3Url}
                  alt=""
                />
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                  <h1 className="truncate text-2xl font-bold text-gray-200">
                    {appUser.username}
                  </h1>
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <span>Follow</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {appUser.username}
              </h1>
            </div>
          </div>
        </div>

        {products.length ? (
          <ProductsGrid products={products} appUser={appUser} />
        ) : (
          <div className="pt-20">
            <h3>No Products</h3>
          </div>
        )}
      </Container>
    </>
  );
}
