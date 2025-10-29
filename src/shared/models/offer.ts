import { OfferReadModel } from 'contexts/vm/offer/application/query/read-model/OfferReadModel';

import { Type } from './type';
import { Category } from './category';

export interface Offer extends OfferReadModel {
    type: Type | null;
    category: Category | null;
}
