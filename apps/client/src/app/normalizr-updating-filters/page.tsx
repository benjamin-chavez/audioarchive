// apps/client/src/app/normalizr/page.tsx
// import 'server-only';
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ClientPage from './client-page';
import Link from 'next/link';

function page() {
  const router = useRouter();

  return (
    <div>
      <ClientPage />
    </div>
  );
}

export default page;
