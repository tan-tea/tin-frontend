import type { InferSelectModel } from 'drizzle-orm';

import { carts } from 'lib/db/schema';

export interface Cart extends InferSelectModel<typeof carts> {}
