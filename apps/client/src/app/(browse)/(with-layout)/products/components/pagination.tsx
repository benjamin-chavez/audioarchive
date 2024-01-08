// // apps/client/src/app/(browse)/(with-layout)/products/paginated/pagination.tsx

// // export function OldPagination() {
// //   return (
// //     <div>
// //       <div className="mt-10 space-x-4 flex">
// //         <button
// //           className="px-4 py-2 rounded bg-pink-500 disabled:bg-pink-200 text-gray-300"
// //           // onClick={() => setPage(page - 1)}
// //           onClick={() => setPage((old) => Math.max(old - 1, 1))}
// //           disabled={page === 1}
// //         >
// //           Previous Page
// //         </button>

// //         <div className="px-4 py-2">{page}</div>

// //         <button
// //           className="px-4 py-2 rounded bg-pink-500 disabled:bg-pink-200 text-gray-300"
// //           // onClick={() => setPage(page + 1)}
// //           onClick={() => {
// //             if (!isPlaceholderData && data.hasMore) {
// //               setPage((old) => old + 1);
// //             }
// //           }}
// //           // disabled={isPlaceholderData || !data?.hasMore}
// //         >
// //           Next Page
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

'use client';

import { FiltersContext } from '@/contexts/filter-context';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { current } from 'immer';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';

function PaginationPrevious({
  currentPage,
  handlePageChange,
}: {
  currentPage: number;
  handlePageChange: (targetPage: number) => void;
}) {
  const targetPage = currentPage - 1;

  return (
    <div
      // justify-start flex-1
      className="flex min-w-0  "
    >
      <button
        onClick={() => handlePageChange(targetPage)}
        className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="h-6 w-6" />
        <span>Previous</span>
      </button>
    </div>
  );
}

function PaginationNext({
  currentPage,
  totalPages,
  handlePageChange,
}: {
  currentPage: number;
  totalPages: number;
  handlePageChange: (targetPage: number) => void;
}) {
  const targetPage = currentPage + 1;

  return (
    <div
      // justify-end flex-1
      className="flex min-w-0 "
    >
      <button
        onClick={() => handlePageChange(targetPage)}
        className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
        disabled={currentPage === totalPages}
      >
        <span>Next</span>
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}

// const pageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function Pagination({
  currentPage,
  totalPages, // onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  // onPageChange: (targetPage: number) => void;
}) {
  const { handlePagination } = useContext(FiltersContext);
  const handlePageChange = (targetPage) => {
    // onPageChange(targetPage);
    handlePagination(targetPage);
  };

  // TODO: Fix up this logic for the displayed page options
  const pageNumbers = Array.from(Array(totalPages).keys());

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locSearchParams: URLSearchParams = new URLSearchParams(
    searchParams as unknown as string,
  );

  console.log(`${pathname}?${locSearchParams}`);
  return (
    <>
      <nav
        aria-label="Pagination"
        //  text-sm font-medium
        className="flex items-center justify-center text-gray-700 mt-6"
      >
        <div className="flex justify-between w-1/2">
          <PaginationPrevious
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
          <div className="flex space-x-4">
            {pageNumbers
              .slice(currentPage - 2, currentPage + 1)
              .map((pageNum) => (
                <div key={pageNum}>
                  <button
                    onClick={() => handlePageChange(pageNum)}
                    className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                    // disabled={pageNum === currentPage}
                  >
                    {pageNum}
                  </button>
                </div>
              ))}
          </div>
          {/* <span className="inline-flex h-10 items-center px-1.5 text-gray-500">
              ...
            </span> */}

          <PaginationNext
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </nav>
    </>
  );
}
