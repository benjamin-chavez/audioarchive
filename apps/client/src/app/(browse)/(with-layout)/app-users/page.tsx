// apps/client/src/app/(browse)/app-users/page.tsx

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import 'server-only';

import { AppUser } from '@shared/src';
import Link from 'next/link';
import Container from '@/components/container';

async function getAppUsers() {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
  const res = await fetch(`${BASE_URL}/app-users/profiles`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

function AppUserCard({ appUser }: { appUser: AppUser }) {
  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-lg h-80 w-72">
        <div className="aspect-h-2 aspect-w-6  sm:aspect-none  h-48 ">
          <Link href={`/${appUser.username}`}>
            <img
              src={appUser.avatarS3Url}
              alt={appUser.avatarS3Url}
              className="h-full w-full object-cover object-center sm:h-full sm:w-full hover:opacity-75"
            />
            {/* <Image fill src={} alt={''} /> */}
          </Link>
        </div>
        <div className="flex flex-1 flex-col space-y-2 p-4 bg-white dark:bg-[#181A1B]">
          <h3 className="text-sm font-medium text-gray-900 "></h3>
          <p className="text-sm text-gray-500 dark:text-[#9E9589]">
            {appUser.firstName} | {appUser.username}
          </p>
          <p className="text-sm text-gray-500 dark:text-[#9E9589]">
            Producer:{' '}
            <Link
              href={`/${appUser.username}`}
              className="hover:text-blue-500 "
            >
              {appUser.username}
            </Link>
          </p>
          <div className="flex flex-1 flex-col justify-end">
            <p className="text-base font-medium text-gray-900 dark:text-[#D6D3CD] ">
              {/* {appUser.username} */}
              {/* @ts-ignore */}
              {appUser.displayName}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function AppUsersGrid({ appUsers }: { appUsers: AppUser[] }) {
  if (appUsers) {
    return (
      <Container>
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-3 sm:gap-x-3 sm:gap-y-10 xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 place-items-center">
          {appUsers.map((appUser: AppUser) => {
            return (
              <div key={appUser.id}>
                <AppUserCard key={appUser.id.toString()} appUser={appUser} />
              </div>
            );
          })}
        </div>
      </Container>
    );
  }
}

export default async function SearchPage() {
  const res = await getAppUsers();
  const appUsers = res.data;

  return (
    <div
      // className="pt-20"
      className="pt-10"
    >
      <AppUsersGrid appUsers={appUsers} />
    </div>
  );
}
export const dynamic = 'force-dynamic';
