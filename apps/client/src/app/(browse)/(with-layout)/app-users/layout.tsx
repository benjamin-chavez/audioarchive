// apps/client/src/app/(browse)/(with-layout)/products/layout.tsx

import { filters, filters1, sortOptions } from '../../(root)/products/config';
import { Filters } from './components/filters';

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

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-red-500">
      <div className="bg-gray-50">
        <div>
          <main>
            <CategoryHeader />

            {/* <Filters  filters1={filters1}  filters={filters} sortOptions={sortOptions} /> */}
            {children}
          </main>
        </div>
      </div>
    </section>
  );
}
