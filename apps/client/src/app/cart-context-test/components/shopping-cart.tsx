// apps/client/src/app/cart-context-test/components/shopping-cart.tsx

import { useCart } from '@/contexts/cartContext';
import storeItems from '../data/items.json';
import { CartItem } from './cart-item';
import { formatCurrency } from '../utils/formatCurrency';

export function ShoppingCart() {
  const { cartItems } = useCart();

  return (
    <div className="bg-blue-500/40 py-16">
      <h2 className="font-bold text-lg">Cart</h2>
      <div>
        <div className="gap-3">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{' '}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
