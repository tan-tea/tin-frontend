import { CategoryReadModel } from 'contexts/wm/category/application/query/read-model/CategoryReadModel';

import { Offer } from './offer';
import { Subcategory } from './subcategory';

export interface Category extends CategoryReadModel {
    slug: string;
    offers: Array<Offer>;
    subcategoryId: string;
    subcategory: Subcategory;
}
