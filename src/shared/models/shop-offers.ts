import type { InferSelectModel } from 'drizzle-orm';

import { shopOffers } from 'lib/db/schema';

import { Shop } from './shop';
import { Offer } from './offer';

export interface ShopOffers extends InferSelectModel<typeof shopOffers> {
    shop?: Shop;
    offer?: Offer;
}
