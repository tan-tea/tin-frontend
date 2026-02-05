import type { InferSelectModel } from 'drizzle-orm';

import { offers } from 'lib/db/schema';

import { Category } from './category';
import { Subcategory } from './subcategory';
import { OfferImage } from './offer-image';
import { OptionGroup } from './option-group';
import { Workspace } from './workspace';
import { ShopOffers } from './shop-offers';
import { CartItem } from './cart-item';

export interface Offer extends InferSelectModel<typeof offers> {
    category?: Category;
    subcategory: Subcategory | null;
    workspace?: Workspace;
    shops?: Array<ShopOffers>;
    images: Array<OfferImage>;
    optionGroups: Array<OptionGroup>;
    cartItems?: Array<CartItem>;
    appointments?: Array<any>;
}
