// // apps/client/src/app/(browse)/products/filters.tsx

// 'use client';

// import { Menu, Popover, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { Fragment, useContext, useState } from 'react';
// // import MobileFilterMenu from './mobile-filter-menu';
// import { Checkbox } from '@/components/ui/checkbox';
// // import { FiltersContext } from '@/contexts/filters-context-old';
// import { normalizedData_OPTION1 } from '@/lib/normalize';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// export function Filters({ sortOptions }: { sortOptions: any }) {
//   // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   // const [filters, setFilters] = useState(normalizedData_OPTION1);
//   const {
//     filterItems: filters,
//     selectedFiltersByCategory,
//     deselectAllFilters,
//     addSelectedFilter,
//     removeSelectedFilter,
//   } = useContext(FiltersContext);

//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const handleUpdateFilters = (
//     category: any,
//     filterId: string,
//     checked: boolean,
//   ) => {
//     const locSearchParams: URLSearchParams = new URLSearchParams(
//       searchParams as unknown as string,
//     );

//     if (checked) {
//       locSearchParams.append(category, filterId);
//       locSearchParams.sort();
//       addSelectedFilter(category, filterId);
//     } else {
//       locSearchParams.delete(category, filterId);
//       removeSelectedFilter(category, filterId);
//     }

//     router.push(`${pathname}?${locSearchParams}`);
//   };

//   return (
//     <>
//       {/* <MobileFilterMenu
//         filters={filters}
//         mobileFiltersOpen={mobileFiltersOpen}
//         setMobileFiltersOpen={setMobileFiltersOpen}
//       /> */}
//       {/* Filters */}
//       <section aria-labelledby="filter-heading">
//         <h2 id="filter-heading" className="sr-only">
//           Filters
//         </h2>

//         {/* HERE */}
//         <div className="border-b border-gray-200 bg-white pb-4">
//           <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//             <Menu as="div" className="relative inline-block text-left">
//               <div>
//                 <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
//                   Sort
//                   <ChevronDownIcon
//                     className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                     aria-hidden="true"
//                   />
//                 </Menu.Button>
//               </div>

//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
//                   <div className="py-1">
//                     {sortOptions.sort_by.map((option) => (
//                       <Menu.Item key={option.name}>
//                         {({ active }) => (
//                           <div
//                             // href={option.href}
//                             className={classNames(
//                               option.current
//                                 ? 'font-medium text-gray-900'
//                                 : 'text-gray-500',
//                               active ? 'bg-gray-100' : '',
//                               'block px-4 py-2 text-sm cursor-pointer',
//                             )}
//                             // onClick={() => handleSortParam(option)}
//                           >
//                             {option.name}
//                           </div>
//                         )}
//                       </Menu.Item>
//                     ))}
//                   </div>
//                 </Menu.Items>
//               </Transition>
//             </Menu>

//             <button
//               type="button"
//               className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
//               onClick={() => setMobileFiltersOpen(true)}
//             >
//               Filters
//             </button>

//             <div className="hidden sm:block">
//               <div className="flow-root">
//                 <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
//                   {Object.entries(filters?.entities?.categories).map(
//                     ([categoryId, category]) => (
//                       <Popover
//                         key={categoryId}
//                         className="relative inline-block px-4 text-left"
//                       >
//                         <Popover.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
//                           {/* @ts-ignore */}
//                           <span>{category.name}</span>
//                           {/* {sectionIdx === 0 ? ( */}
//                           <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
//                             1{/* {category} */}
//                           </span>
//                           {/* ) : null} */}
//                           <ChevronDownIcon
//                             className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                             aria-hidden="true"
//                           />
//                         </Popover.Button>

//                         <Transition
//                           as={Fragment}
//                           enter="transition ease-out duration-100"
//                           enterFrom="transform opacity-0 scale-95"
//                           enterTo="transform opacity-100 scale-100"
//                           leave="transition ease-in duration-75"
//                           leaveFrom="transform opacity-100 scale-100"
//                           leaveTo="transform opacity-0 scale-95"
//                         >
//                           <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
//                             {/* HERE */}

//                             <form className="space-y-4 text-red-500">
//                               {category.options.map((filterId) => {
//                                 return (
//                                   <div key={`${categoryId}-${filterId}`}>
//                                     <Checkbox
//                                       name={`${filterId}`}
//                                       defaultChecked={filterId.checked}
//                                       id={`${category}-${filterId}`}
//                                       defaultValue={filterId.checked}
//                                       onCheck={(checked) =>
//                                         handleUpdateFilters(
//                                           categoryId,
//                                           filterId,
//                                           checked,
//                                         )
//                                       }
//                                     >
//                                       {filterId}
//                                     </Checkbox>
//                                   </div>
//                                 );
//                               })}
//                             </form>
//                           </Popover.Panel>
//                         </Transition>
//                       </Popover>
//                     ),
//                   )}
//                 </Popover.Group>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Active filters */}
//         {/* <SelectedFilters /> */}
//       </section>
//     </>
//   );
// }
