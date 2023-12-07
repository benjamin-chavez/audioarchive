// apps/client/src/app/dashboard/page.tsx

import 'server-only';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Container from '@/components/container';

export default async function DashboardPage() {
  const session = await getSession();
  const user = session ? session.user : null;

  console.log(user);
  return (
    <Container>
      <h1>{user?.username} Dashbaord</h1>

      <ul className="mt-10">
        <li>
          <Link href={'dashboard/products'}>My Products</Link>
        </li>
        <li>
          <Link href={'dashboard/accounts'}>My Accounts</Link>
        </li>
        <li>
          <Link href={'dashboard/orders'}>My Orders</Link>
        </li>
        <li>
          <Link href={'cart'}>My Shopping Cart</Link>
        </li>
        <li>
          <Link href={'dashboard/settings'}>My Settings</Link>
        </li>
      </ul>
    </Container>
  );
}
