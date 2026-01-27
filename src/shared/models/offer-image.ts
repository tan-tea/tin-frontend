import type { InferSelectModel } from 'drizzle-orm';

import { offerImages } from 'lib/db/schema';

export interface OfferImage extends InferSelectModel<typeof offerImages> {}
