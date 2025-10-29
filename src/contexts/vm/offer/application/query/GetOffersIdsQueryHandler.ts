import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';

import { GetOffersIdsQuery } from './GetOffersIdsQuery';
import { OfferRepository } from '../../domain/OfferRepository';
import { OffersIdsReadModel } from './read-model/OffersIdsReadModel';

export class GetOffersIdsQueryHandler implements QueryHandler<GetOffersIdsQuery, OffersIdsReadModel> {
    constructor(
        private readonly offerRepository: OfferRepository,
    ) {}

    subscribedTo(): Query {
        return GetOffersIdsQuery;
    }

    async handle(_: GetOffersIdsQuery): Promise<OffersIdsReadModel> {
        const offersIds = await this.offerRepository.getOffers();
        return new OffersIdsReadModel(offersIds);
    }
}
