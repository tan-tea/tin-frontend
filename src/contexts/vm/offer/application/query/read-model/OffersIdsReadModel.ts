import { Offer } from 'contexts/vm/offer/domain/Offer';
import { OfferReadModel } from './OfferReadModel';

export class OffersIdsReadModel {
    readonly offersIds: Array<OfferReadModel['id']>;

    constructor(offers: Array<Offer>) {
        this.offersIds = offers.map(offer => offer.id.value);
    }
}
