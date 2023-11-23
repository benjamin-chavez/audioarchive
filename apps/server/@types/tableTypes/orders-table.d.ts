import { Knex } from 'knex';
import { Order } from '@shared/src/schemas';
declare module 'knex/types/tables' {
    interface Tables {
        orders: Order;
        orders_composite: Knex.CompositeTableType<Order, Pick<Order, 'appUserId' | 'stripePaymentIntentId' | 'paymentStatus' | 'stripeCheckoutSessionId'> & Partial<Omit<Order, 'id'>>, Partial<Omit<Order, 'id'>>>;
    }
}
//# sourceMappingURL=orders-table.d.ts.map