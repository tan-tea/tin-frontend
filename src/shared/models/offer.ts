import { OfferReadModel } from 'contexts/vm/offer/application/query/read-model/OfferReadModel';

import { Category } from './category';

export interface Offer extends OfferReadModel {
    slug: string;
    category: Category | null;
}
