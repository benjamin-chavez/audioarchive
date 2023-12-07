'use client';

// TODO: make sure the rest of mantime gets pruned or implement yourself https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/hooks/src/use-intersection/use-intersection.ts
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const posts = [
  { id: 1, title: 'post 1' },
  { id: 2, title: 'post 2' },
  { id: 3, title: 'post 3' },
  { id: 4, title: 'post 4' },
  { id: 5, title: 'post 5' },
  { id: 6, title: 'post 6' },
  { id: 7, title: 'post 7' },
  { id: 8, title: 'post 8' },
  { id: 9, title: 'post 9' },
  { id: 10, title: 'post 10' },
  { id: 11, title: 'post 11' },
  { id: 12, title: 'post 12' },
  { id: 13, title: 'post 13' },
  { id: 14, title: 'post 14' },
  { id: 15, title: 'post 15' },
  { id: 16, title: 'post 16' },
  { id: 17, title: 'post 17' },
  { id: 18, title: 'post 18' },
  { id: 19, title: 'post 19' },
  { id: 20, title: 'post 20' },
];

const fetchPosts = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return posts.slice((page - 1) * 2, page * 2);
};

const Page = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['query'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchPosts(pageParam);
      return response;
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialData: () => ({
      pages: [posts.slice(0, 2)],
      pageParams: [undefined],
    }),
    initialPageParam: undefined,
  });

  const { ref, entry } = useIntersection({
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  const _posts = data?.pages.flatMap((page) => page);

  return (
    <div>
      posts:
      {_posts?.map((post, i) => (
        <div
          key={post.id}
          ref={i === _posts.length - 1 ? ref : null}
          className={
            i === _posts.length - 1
              ? 'bg-green-500/40 mt-2 w-1/2 h-80'
              : 'bg-pink-500/40 mt-2 w-1/2 h-80'
          }
        >
          {post.title}
        </div>
      ))}
      <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
        {isFetchingNextPage
          ? 'Loading more...'
          : (data?.pages.length ?? 0) < 3
            ? 'Load More'
            : 'Nothing more to load'}
      </button>
    </div>
  );
};

export default Page;
