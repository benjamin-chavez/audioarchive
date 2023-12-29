// apps/client/src/app/dashboard/products/page.tsx

// apps/client/src/app/(app-users)/settings/components/products-overview.tsx
import 'server-only';

import React from 'react';
import {
  getAccessToken,
  getSession,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0';
// import { getAppUserWithProducts } from '@/lib/data/app-user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product, ProductWithAppUser, User } from '@shared/src';
import Link from 'next/link';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { getMyProducts } from '@/lib/data/me';
import { capitalizeFirstLetter, classNames } from '@/lib/utils';
import { CURRENCY, formatAmountForDisplay } from '@/lib/cart-calculations';

export async function revalidateListings() {
  'use server';
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export default async function MyProductsPage() {
  const session = await getSession();
  const user = session ? session.user : null;

  const res = await getMyProducts();
  const { appUser, products } = res.data;

  if (products) {
    return (
      <>
        <TwTable products={products} />
        {/* <ShadcnTable products={products} /> */}
      </>
    );
  } else {
    return <div>{user?.username}</div>;
  }
}

function ProductsHeader() {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-white">
          Products
        </h1>
        <p className="mt-2 text-sm text-gray-300">
          A list of all the products in your account including their.
        </p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <Link
          href="/dashboard/products/new"
          // type="button"
          className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Add product
        </Link>
      </div>
    </div>
  );
}

export const statuses = {
  published: 'text-green-400 bg-green-400/10',
  draft: 'text-yellow-400 bg-yellow-400/10',
};

function TwTable({ products }: { products: Product[] }) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <ProductsHeader />

            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          DAW
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Genre
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {products.map((product) => (
                        <tr key={product.name}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                            {product.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {product.daw}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {product.genreName}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {formatAmountForDisplay(product.price, CURRENCY)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            <div className="flex items-center justify-end gap-x-2  sm:justify-start">
                              <div
                                className={classNames(
                                  statuses[product.status],
                                  'flex-none rounded-full p-1',
                                )}
                              >
                                <div className="h-1.5 w-1.5 rounded-full bg-current" />
                              </div>
                              {capitalizeFirstLetter(product.status)}
                            </div>
                          </td>

                          <td
                            // pl-3
                            className="relative whitespace-nowrap py-4  pr-4  text-center text-sm font-medium sm:pr-0"
                          >
                            <Link
                              href={`/dashboard/products/edit/${product.id}`}
                              className="text-indigo-400 hover:text-indigo-300"
                            >
                              Edit
                              <span className="sr-only">, {product.name}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShadcnTable({ products }: { products: Product[] }) {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="bg-gray-900 py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <ProductsHeader />

            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                          Name
                        </TableHead>
                        <TableHead>DAW</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {products.map((product) => {
                        return (
                          <TableRow key={product.name}>
                            <TableCell
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                              // className="font-medium"
                            >
                              {product.name}
                            </TableCell>
                            <TableCell>{product.daw}</TableCell>
                            <TableCell>{product.genre}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <a
                                href="#"
                                className="text-indigo-400 hover:text-indigo-300"
                              >
                                Edit
                                <span className="sr-only">
                                  , {product.name}
                                </span>
                              </a>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
