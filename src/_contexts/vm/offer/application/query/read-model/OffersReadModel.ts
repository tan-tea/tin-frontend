import { Offer } from 'contexts/vm/offer/domain/Offer';

import { OfferReadModel } from './OfferReadModel';

export class OffersReadModel {
    readonly offers: Array<OfferReadModel>;

    constructor(offers: Array<Offer>) {
        this.offers = offers.map((offer) => offer.toPrimitives());
    }
}
