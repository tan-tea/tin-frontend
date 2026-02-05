import type { InferSelectModel } from 'drizzle-orm';

import { categories } from 'lib/db/schema';

import { Offer } from './offer';
import { Subcategory } from './subcategory';

export interface Category extends InferSelectModel<typeof categories> {
    offers?: Array<Offer>;
    subcategories?: Array<Subcategory>;
}
