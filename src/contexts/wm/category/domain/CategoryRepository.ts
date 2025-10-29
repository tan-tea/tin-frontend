import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { Category } from './Category';
import { CategoryId } from './value-object/CategoryId';

export interface CategoryRepository {
    getCategoryById(id: CategoryId): Promise<Category | null>;
    getCategoriesByWorkspaceId(workspaceId: ExternalId): Promise<Array<Category>>;
}
