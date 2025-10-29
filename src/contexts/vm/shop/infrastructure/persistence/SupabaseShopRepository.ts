import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Shop } from '../../domain/Shop';
import { ShopRepository } from '../../domain/ShopRepository';

export class SupabaseShopRepository
	extends SupabaseRepository<Shop>
	implements ShopRepository
{
    async getShopsByWorkspaceId(workspaceId: ExternalId): Promise<Array<Shop>> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('workspace_id', workspaceId.value);

        if (error) return [];

        return data.map(shop => Shop.fromPrimitives({
            ...shop,
            workspaceId: shop.workspace_id,
            isPrimary: shop.is_primary,
            isVerified: shop.is_verified,
            createdAt: new Date(shop.created_at),
        }))
    }

    protected entityName(): string {
        return 'shops';
    }
}
