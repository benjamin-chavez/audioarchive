// apps/client/src/app/(browse)/(with-layout)/products/layout.tsx
import 'server-only';

// import { Filters } from './components/filters';
// import { FiltersCopy } from './components/filters';
import NewFilterComponent from './new-filter-component';

import { modifyData } from '@/lib/normalize';
import { normalize, schema } from 'normalizr';
import { Suspense } from 'react';
// import { FiltersContext } from '@/contexts/filters-context-old';

function CategoryHeader() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Project Files
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
  const res = await fetch(`${BASE_URL}/search/test`);

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

export default async function ProductsLayout({
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

          {/* <FiltersCopy
              filters={filters1}
              sortOptions={sortOptions}

            /> */}
          <NewFilterComponent normalizedFilterData={normalizedFilterData} />

          {/* <Filters sortOptions={sortOptions} /> */}
          {/* {children} */}
        </main>
      </div>
    </section>
  );
}
