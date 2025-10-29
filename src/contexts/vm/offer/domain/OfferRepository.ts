import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { Offer } from './Offer';
import { OfferId } from './value-object/OfferId';

export interface OfferRepository {
    getOffers(): Promise<Array<Offer>>;
    getOfferById(id: OfferId): Promise<Offer | null>;
    getOffersByShopId(shopId: ExternalId): Promise<Array<Offer>>;
    getOffersByCategoryId(categoryId: ExternalId): Promise<Array<Offer>>;
}
