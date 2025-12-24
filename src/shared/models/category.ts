import { CategoryReadModel } from 'contexts/wm/category/application/query/read-model/CategoryReadModel';

import { Offer } from './offer';

export interface Category extends CategoryReadModel {
    slug: string;
    offers: Array<Offer>;
}
