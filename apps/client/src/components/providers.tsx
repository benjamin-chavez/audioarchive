// apps/client/src/components/providers.tsx

'use client';

import { CartProvider } from '@/contexts/cartContext';
// import { MeProvider } from '@/contexts/appUserContext';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          {/* <MeProvider> */}
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
          {/* </MeProvider> */}
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
