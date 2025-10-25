import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { Shop } from './Shop';

export interface ShopRepository {
    getShopsByWorkspaceId(workspaceId: ExternalId): Promise<Array<Shop>>;
}
