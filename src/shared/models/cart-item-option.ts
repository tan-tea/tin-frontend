import type { InferSelectModel } from 'drizzle-orm';

import { cartItemOptions } from 'lib/db/schema';

export interface CartItemOption extends InferSelectModel<typeof cartItemOptions> {}
