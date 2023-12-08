// apps/client/src/app/cart-context-test/components/store-item.tsx

import { useCart } from '@/contexts/cartContext';
import { ReactNode } from 'react';
import { Button } from '../../../../../../packages/ui';
import { formatCurrency } from '../utils/formatCurrency';

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

function Card({ children }: { children: ReactNode }) {
  return <div className="bg-pink-500 h-96">{children}</div>;
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useCart();
  const quantity = getItemQuantity(id);

  return (
    <Card>
      <img
        // variant="top"
        src={imgUrl}
        className="h-[200px]"
        style={{ objectFit: 'cover' }}
      />
      <div className="d-flex flex-column">
        <h2 className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </h2>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: '.5rem' }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: '.5rem' }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                className="bg-red-500"
                onClick={() => removeFromCart(id)}
                // variant="danger"
                // size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
