import { Knex } from 'knex';
import { OrderItem } from '@shared/src/schemas';
declare module 'knex/types/tables' {
    interface Tables {
        order_items: OrderItem;
        order_items_composite: Knex.CompositeTableType<OrderItem, Pick<OrderItem, 'orderId' | 'productId'> & Partial<Omit<OrderItem, 'id'>>, Partial<Omit<OrderItem, 'id'>>>;
    }
}
//# sourceMappingURL=order-items-table.d.ts.map