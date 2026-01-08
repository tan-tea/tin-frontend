import { OfferReadModel } from 'contexts/vm/offer/application/query/read-model/OfferReadModel';

import { Shop } from './shop';
import { Category } from './category';
import { Workspace } from './workspace';
import { OptionGroup } from './option-group';

export type OfferType = 'service' | 'product';

export type OfferSchedulingType = 'provider' | 'capacity';

export interface Offer extends OfferReadModel {
    type: OfferType;
    schedulingType: OfferSchedulingType;
    duration: number;
    slug: string;
    shops: Array<Shop>;
    workspaceId: string;
    workspace: Workspace;
    categoryId: string;
    category: Category | null;
    optionGroups: Array<OptionGroup>;
}
