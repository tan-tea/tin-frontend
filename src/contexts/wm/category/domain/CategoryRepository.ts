import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { Category } from './Category';

export interface CategoryRepository {
    getCategoriesByWorkspaceId(workspaceId: ExternalId): Promise<Array<Category>>;
}
