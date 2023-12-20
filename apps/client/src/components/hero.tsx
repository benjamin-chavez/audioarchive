// apps/client/src/components/hero.tsx

import Link from 'next/link';

export function Hero() {
  return (
    <div className="">
      <div className="relative bg-gray-900 bg-green-500">
        <div className="bg-red-500">
          {' '}
          <div
            aria-hidden="true"
            //  -mt-96
            className="absolute inset-0 overflow-hidden"
          >
            <img
              src="./chet-porter-banner-seed.webp"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div
            aria-hidden="true"
            //  -mt-96
            className="absolute inset-0 bg-gray-900 opacity-50 "
          />
        </div>

        <div className=" relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
            New arrivals are here
          </h1>
          <p className="mt-4 text-xl text-white">
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they&apos;re still
            in stock.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Shop New Arrivals
          </Link>
        </div>
      </div>
    </div>
  );
}
