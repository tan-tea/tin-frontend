import type { InferSelectModel } from 'drizzle-orm';

import { offers } from 'lib/db/schema';

export interface Offer extends InferSelectModel<typeof offers> {}
