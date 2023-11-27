// apps/client/src/app/dashboard/settings/page.tsx

import { getMe } from '@/lib/data/me';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import SettingsForm from './settings-form';

async function revalidateAppUser() {
  'use server';

  await redirect('/api/auth/logout');
  await revalidatePath('/dashboard');
}

export default async function MySettingsPage() {
  const res = await getMe();
  const appUser = res.data;

  return (
    <div>
      <h1>My Settings Page</h1>
      <SettingsForm appUser={appUser} revalidateAppUser={revalidateAppUser} />
    </div>
  );
}
