import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';

import { OfferId } from '../../domain/value-object/OfferId';
import { OfferRepository } from '../../domain/OfferRepository';
import { GetOfferByIdQuery } from './GetOfferByIdQuery';
import { OfferReadModel } from './read-model/OfferReadModel';

export class GetOfferByIdQueryHandler implements QueryHandler<GetOfferByIdQuery, OfferReadModel> {
    constructor(
        private readonly offerRepository: OfferRepository,
    ) {}

    subscribedTo(): Query {
        return GetOfferByIdQuery;
    }

    async handle(query: GetOfferByIdQuery): Promise<OfferReadModel> {
        const offerId = new OfferId(query.id);

        const offerById = await this.offerRepository.getOfferById(offerId);
        if (!offerById) {
            throw new Error();
        }

        return new OfferReadModel(offerById);
    }
}

