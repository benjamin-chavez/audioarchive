// apps/client/src/components/providers.tsx

'use client';

import { CartProvider } from '@/contexts/cartContext';
import FiltersProvider from '@/contexts/filter-context';
import { FavoritesProvider } from '@/contexts/wishlist-context';
// import { MeProvider } from '@/contexts/appUserContext';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { reduxStore } from '../lib/redux/store';

export default function Providers({
  children,
  getMyCart,
}: {
  children: ReactNode;
  // getMyCart: Promise<any>;
  getMyCart: any;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <ReduxProvider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          {/* <MeProvider> */}
          <CartProvider>
            <FiltersProvider>
              <FavoritesProvider>
                <ReactQueryDevtools initialIsOpen={false} />
                {children}
              </FavoritesProvider>
            </FiltersProvider>
          </CartProvider>
          {/* </MeProvider> */}
        </UserProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
