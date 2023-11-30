import 'server-only';
// import { loadEnvVariables } from '@/lib/clientEnv';

import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
// import type Metadata from 'next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GeistSans, GeistMono } from 'geist/font';
// import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import Container from '../components/container';
import Navbar from '../components/navbar';
// import TanstackQueryProviders from '../lib/tanstack-query-utils/tanstackQueryProviders';
// import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.className}`}
      // className="dark"
    >
      <body className={inter.className}>
        {/* <TanstackQueryProviders> */}
        <UserProvider>
          <Navbar />
          <Container>{children}</Container>
        </UserProvider>

        {/* </TanstackQueryProviders> */}
      </body>
    </html>
  );
}

// export const dynamic = 'force-dynamic';
