// apps/client/src/app/(browse)/(with-layout)/products/layout.tsx

import { modifyData } from '@/lib/normalize';
import { normalize, schema } from 'normalizr';
import NewFilterComponent from '../products/components/new-filter-component';

function CategoryHeader() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Artists & Producers
        </h1>
        <p className="mt-4 max-w-xl text-sm text-gray-700">
          Our thoughtfully designed workspace objects are crafted in limited
          runs. Improve your productivity and organization with these sale items
          before we run out.
        </p>
      </div>
    </div>
  );
}

const fetchData = async () => {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  const res = await fetch(`${BASE_URL}/search/populate-filters-and-appUsers`);

  if (!res.ok) {
    throw new Error('Failed to fetch initial Filter data');
  }

  const { data } = await res.json();

  if (!data) {
    return;
  }

  const modifiedData = modifyData(data.filters);
  const option = new schema.Entity('options');
  const category = new schema.Entity('categories', {
    options: [option],
  });

  return normalize(modifiedData, [category]);
};

export default async function AppUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const normalizedFilterData = await fetchData();

  return (
    <section className="bg-red-500">
      <div className="bg-gray-50">
        <main>
          <CategoryHeader />

          <NewFilterComponent
            artists
            normalizedFilterData={normalizedFilterData}
          />
          {children}
        </main>
      </div>
    </section>
  );
}
