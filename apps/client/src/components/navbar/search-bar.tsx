// apps/client/src/components/navbar/search-bar.tsx
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type FormData = {
  searchQuery: string;
};

function SearchBar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  // const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  const onSubmit: SubmitHandler<FormData> = (input) => {
    // router.push(`/products/search?q=${encodeURIComponent(input.searchQuery)}`);
    router.push(`/products/search?q=${encodeURIComponent(input.searchQuery)}`);
  };

  /*
   * ******************************
   * THIS IS THE ONE YOU ARE USING
   * ******************************
   */

  return (
    <div
      // flex flex-1 justify-center px-2 lg:ml-6 lg:justify-center
      className=""
    >
      <div className="w-full max-w-lg lg:max-w-xs">
        <form
          // encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          // className="space-y-6"
        >
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              defaultValue=""
              {...register('searchQuery', { required: true })}
              // focus:bg-white focus:text-gray-900
              className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400  focus:bg-pink-500/20 focus:text-gray-300 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Search"
              type="search"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export { SearchBar };
