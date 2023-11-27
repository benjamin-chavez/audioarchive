// apps/client/src/app/(app-users)/settings/components/products-overview.tsx
import 'server-only';

import React from 'react';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
// import { getAppUserWithProducts } from '@/lib/data/app-user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product, ProductWithAppUser } from '@shared/src';
import Link from 'next/link';

export default withPageAuthRequired(
  async function ProductsOverview({ products }: { products: Product[] }) {
    // const { user } = await getSession();
    // const res = await getAppUserWithProducts(parseInt(user.id));
    // const { appUser, products } = res.data;

    return (
      <>
        <TwTable products={products} />
        {/* <ShadcnTable products={products} /> */}
      </>
    );
  },
  { returnTo: '/settings/products-overview' },
);

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
        <button
          type="button"
          className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Add product
        </button>
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
                        <TableHead>Software</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {products.map((product) => {
                        return (
                          <TableRow key={product}>
                            <TableCell
                              className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
                              // className="font-medium"
                            >
                              {product.name}
                            </TableCell>
                            <TableCell>{product.software}</TableCell>
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

export function TwTable({ products }: { products: Product[] }) {
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
                          Software
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
                            {product.software}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {product.genre}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {product.price}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link
                              href="#"
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
