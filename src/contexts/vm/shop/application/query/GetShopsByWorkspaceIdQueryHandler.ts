import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { ShopRepository } from 'contexts/vm/shop/domain/ShopRepository';

import { GetShopsByWorkspaceIdQuery } from './GetShopsByWorkspaceIdQuery';
import { ShopsReadModel } from './read-model/ShopsReadModel';

export class GetShopsByWorkspaceIdQueryHandler
implements QueryHandler<GetShopsByWorkspaceIdQuery, ShopsReadModel> {
    constructor(
        private readonly shopRepository: ShopRepository,
    ) {}

    subscribedTo(): Query {
        return GetShopsByWorkspaceIdQuery;
    }

    async handle(query: GetShopsByWorkspaceIdQuery): Promise<ShopsReadModel> {
        const workspaceId = new ExternalId(query.workspaceId);

        const shopsByWorkspaceId = await this.shopRepository.getShopsByWorkspaceId(workspaceId);
        if (!shopsByWorkspaceId) {
            throw new Error();
        }

        return new ShopsReadModel(shopsByWorkspaceId);
    }
}
