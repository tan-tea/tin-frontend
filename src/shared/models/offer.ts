import { OfferReadModel } from 'contexts/vm/offer/application/query/read-model/OfferReadModel';

import { Category } from './category';
import { OptionGroup } from './option-group';

export interface Offer extends OfferReadModel {
    slug: string;
    category: Category | null;
    optionGroups: Array<OptionGroup>;
}
