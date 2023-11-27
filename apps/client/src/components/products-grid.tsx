// apps/client/src/components/products-grid.tsx
import 'server-only';

import Card from '../components/card';
import { AppUser, AppUserWithProducts, Product } from '@shared/src';

export default function ProductsGrid({
  products,
  appUser,
}: {
  appUser?: AppUser;
  products?: Product[];
}) {
  if (products) {
    // product.id.toString;
    // console.log('Card: product: ', products);

    return (
      <div className="pt-20">
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-3 sm:gap-x-3 sm:gap-y-10 xl:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 place-items-center">
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
