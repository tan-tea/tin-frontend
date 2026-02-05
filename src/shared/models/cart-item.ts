import type { InferSelectModel } from 'drizzle-orm';

import { cartItems } from 'lib/db/schema';

import { CartItemOption } from './cart-item-option';

export interface CartItem extends InferSelectModel<typeof cartItems> {
    options: Array<CartItemOption>;
}
