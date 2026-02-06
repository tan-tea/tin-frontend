import type { InferSelectModel } from 'drizzle-orm';

import { shops } from 'lib/db/schema';

import { Address } from './address';
import { Geolocation } from './geolocation';
import { ShopOffers } from './shop-offers';
import { Schedule } from './schedule';

export interface Shop extends InferSelectModel<typeof shops> {
    address: Address;
    geolocation: Geolocation;
    offers?: Array<ShopOffers>;
    schedules?: Array<Schedule>;
}
