// // @ts-nocheck
// // // apps/client/src/app/infi/products.tsx
// 'use client';

// // import { AppUser } from '@shared/src';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import Link from 'next/link';

// // // import { getProduqz } from '@/server/actions';
// // import { useQuery } from '@tanstack/react-query';
// // import { getProduqs } from '../page';
// // import { AppUser, Product } from '@shared/src';

// // function Produq({ produqs }: { produqs: AppUser[] }) {
// //   const { data, error, isFetched, isLoading } = useQuery({
// //     queryKey: ['produqs'],
// //     queryFn: getProduqs,
// //     initialData: produqs,
// //   });

// //   // if (error) {
// //   //   <h2>{error.message}</h2>;
// //   // }

// //   // if () {
// //   return (
// //     <div>
// //       <h1>Produq</h1>
// //       {produqs.map((produq) => (
// //         <div>{produq.username}</div>
// //       ))}
// //     </div>
// //   );
// //   // }
// // }
// // export default Produq;

// // function AppUserCard({ appUser }: { appUser: AppUser }) {
// //   return (
// //     <>
// //       <div className="group relative flex flex-col overflow-hidden rounded-lg h-80 w-72">
// //         <div className="aspect-h-2 aspect-w-6  sm:aspect-none  h-48 ">
// //           <Link href={`/${appUser.username}`}>
// //             <img
// //               src={appUser.avatarS3Url}
// //               alt={appUser.avatarS3Url}
// //               className="h-full w-full object-cover object-center sm:h-full sm:w-full hover:opacity-75"
// //             />
// //             {/* <Image fill src={} alt={''} /> */}
// //           </Link>
// //         </div>
// //         <div className="flex flex-1 flex-col space-y-2 p-4 bg-white dark:bg-[#181A1B]">
// //           <h3 className="text-sm font-medium text-gray-900 "></h3>
// //           <p className="text-sm text-gray-500 dark:text-[#9E9589]">
// //             {appUser.firstName} | {appUser.lastName}
// //           </p>
// //           <p className="text-sm text-gray-500 dark:text-[#9E9589]">
// //             Producer:{' '}
// //             <Link
// //               href={`/${appUser.username}`}
// //               className="hover:text-blue-500 "
// //             >
// //               {appUser.username}
// //             </Link>
// //           </p>
// //           <div className="flex flex-1 flex-col justify-end">
// //             <p className="text-base font-medium text-gray-900 dark:text-[#D6D3CD] ">
// //               {appUser.username}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// const posts = [
//   { id: 1, title: 'post 1' },
//   { id: 2, title: 'post 2' },
//   { id: 3, title: 'post 3' },
//   { id: 4, title: 'post 4' },
//   { id: 5, title: 'post 5' },
//   { id: 6, title: 'post 6' },
//   { id: 7, title: 'post 7' },
//   { id: 8, title: 'post 8' },
//   { id: 9, title: 'post 9' },
//   { id: 10, title: 'post 10' },
//   { id: 11, title: 'post 11' },
//   { id: 12, title: 'post 12' },
//   { id: 13, title: 'post 13' },
//   { id: 14, title: 'post 14' },
//   { id: 15, title: 'post 15' },
//   { id: 16, title: 'post 16' },
//   { id: 17, title: 'post 17' },
//   { id: 18, title: 'post 18' },
//   { id: 19, title: 'post 19' },
//   { id: 20, title: 'post 20' },
// ];

// const fetchPosts = async (page: number) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return posts.slice((page - 1) * 2, page * 2);
// };

// const Page = () => {
//   const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
//     ['query'],
//     async ({ pageParam = 1 }) => {
//       const response = await fetchPosts(pageParam);
//       return response;
//     },
//     {
//       getNextPageParam: (_, pages) => {
//         return pages.length + 1;
//       },
//       initialData: {
//         pages: [posts.slice(0, 2)],
//         pageParams: [1],
//       },
//     },
//   );

//   return (
//     <div>
//       posts:
//       {data?.pages.map((page, i) => (
//         <div key={i}>
//           {page.map((post) => (
//             <div key={post.id}>{post.title}</div>
//           ))}
//         </div>
//       ))}
//       <button>
//         {isFetchingNextPage ? 'Loading more...' : (data?.pages.length ?? 0) < 3}
//         ? 'Load More' : 'Nothign more to load'
//       </button>
//     </div>
//   );
// };

// // export function AppUsersGrid({ appUsers }: { appUsers: AppUser[] }) {
// //   if (appUsers) {
// //     return (
// //       <Container>
// //         <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-3 sm:gap-x-3 sm:gap-y-10 xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 place-items-center">
// //           {appUsers.map((appUser: AppUser) => {
// //             return (
// //               <div>
// //                 <AppUserCard key={appUser.id.toString()} appUser={appUser} />
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </Container>
// //     );
// //   }
// // }
