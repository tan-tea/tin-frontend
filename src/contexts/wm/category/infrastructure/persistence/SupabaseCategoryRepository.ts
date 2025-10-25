import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Category } from 'contexts/wm/category/domain/Category';
import { CategoryRepository } from 'contexts/wm/category/domain/CategoryRepository';

export class SupabaseCategoryRepository
    extends SupabaseRepository<Category>
    implements CategoryRepository
{
    async getCategoriesByWorkspaceId(workspaceId: ExternalId): Promise<Array<Category>> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('workspace_id', workspaceId.value);

        if (error) return [];

        return data.map(category => Category.fromPrimitives({
            ...category,
            banner: category.banner || '',
            description: category.description || '',
            position: category.position || 0,
            workspaceId: category.workspace_id,
            createdAt: new Date(category.created_at),
        }));
    }

    protected entityName(): string {
        return 'categories';
    }
}
