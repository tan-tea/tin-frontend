import type { InferSelectModel } from 'drizzle-orm';

import { carts } from 'lib/db/schema';

import { CartItem } from './cart-item';

export interface Cart extends InferSelectModel<typeof carts> {
    items?: Array<CartItem>;
}
