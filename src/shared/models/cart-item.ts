import type { InferSelectModel } from 'drizzle-orm';

import { cartItems } from 'lib/db/schema';

export interface CartItem extends InferSelectModel<typeof cartItems> {}
