import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { SupabaseRepository } from 'contexts/shared/infrastructure/persistence/supabase/Repository';

import { Category } from '../../domain/Category';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { CategoryId } from '../../domain/value-object/CategoryId';

export class SupabaseCategoryRepository
    extends SupabaseRepository<Category>
    implements CategoryRepository
{
    async getCategoryById(id: CategoryId): Promise<Category | null> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('id', id.value)
            .single();

        if (error && !data) return null;

        const category = this.parseObjectToCamelCase(data);

        return Category.fromPrimitives({
            ...category,
            banner: category.banner || '',
            description: category.description || '',
            createdAt: new Date(category.createdAt),
        })
    }

    async getCategoriesByWorkspaceId(workspaceId: ExternalId): Promise<Array<Category>> {
        const repository = await this.from();

        const {
            data,
            error,
        } = await repository
            .select('*')
            .eq('workspace_id', workspaceId.value);

        if (error && !data) return [];

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
