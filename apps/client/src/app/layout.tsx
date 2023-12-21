import 'server-only';
// import { loadEnvVariables } from '@/lib/clientEnv';

import '@/styles/globals.css';
import Providers from '@/components/providers';
// import { UserProvider } from '@auth0/nextjs-auth0/client';
// import type Metadata from 'next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GeistSans, GeistMono } from 'geist/font';
// import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';

import Navbar from '../components/navbar/navbar';
import Footer from '@/components/footer';
import { getMyCart } from '@/lib/data/me';
// import AlternateNav from '@/components/test-search/alternate-nav';
import Container from '@/components/container';
import { AudioPlayer } from '@/components/audio-player';

// import Footer from '@/components/footer';
// import Toast from '@/components/ui/toast';

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
      className={`dark ${GeistSans.className} h-full`}
      // className="dark"
    >
      <body className={`${inter.className} h-full w-full`}>
        {/* <UserProvider> */}
        <Providers getMyCart={getMyCart}>
          <Navbar />

          {/* <Container> */}
          {/* <AlternateNav /> */}
          {/* </Container> */}

          {children}
        </Providers>

        <Footer />
        <div className="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120 bg-red-500/10 w-full">
          <AudioPlayer />
        </div>
      </body>
    </html>
  );
}

// export const dynamic = 'force-dynamic';
