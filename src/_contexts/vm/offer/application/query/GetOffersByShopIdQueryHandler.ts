import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { OfferRepository } from '../../domain/OfferRepository';
import { GetOffersByShopIdQuery } from './GetOffersByShopIdQuery';
import { OffersReadModel } from './read-model/OffersReadModel';

export class GetOffersByShopIdQueryHandler
implements QueryHandler<GetOffersByShopIdQuery, OffersReadModel> {
    constructor(
        private readonly offerRepository: OfferRepository,
    ) {}

    subscribedTo(): Query {
        return GetOffersByShopIdQuery;
    }

    async handle(query: GetOffersByShopIdQuery): Promise<OffersReadModel> {
        const shopId = new ExternalId(query.shopId);

        const offersByShopId = await this.offerRepository.getOffersByShopId(shopId);
        if (!offersByShopId) {
            throw new Error();
        }

        return new OffersReadModel(offersByShopId);
    }
}
