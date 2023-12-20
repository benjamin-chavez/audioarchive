// apps/client/src/components/products-grid.tsx
// TODO: Try to get this back on server:
// import 'server-only';

import Card from '../../../../../components/card';
import { AppUser, AppUserWithProducts, Product } from '@shared/src';

export default function ProductsGrid({
  products,
  appUser,
}: {
  appUser?: AppUser;
  products?: Product[];
}) {
  if (products) {
    return (
      <div
        // pt-20
        className=""
      >
        {/* <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-3 sm:gap-x-3 sm:gap-y-10 xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 place-items-center"> */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: Product) => {
            return (
              <>
                <Card key={product.id} product={product} appUser={appUser} />
              </>
            );
          })}
        </div>
      </div>
    );
  }
}
