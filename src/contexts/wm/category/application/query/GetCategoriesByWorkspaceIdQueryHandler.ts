import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { CategoryRepository } from 'contexts/wm/category/domain/CategoryRepository';

import { GetCategoriesByWorkspaceIdQuery } from './GetCategoriesByWorkspaceIdQuery';
import { CategoriesReadModel } from './read-model/CategoriesReadModel';

export class GetCategoriesByWorkspaceIdQueryHandler
implements QueryHandler<GetCategoriesByWorkspaceIdQuery, CategoriesReadModel> {
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    subscribedTo(): Query {
        return GetCategoriesByWorkspaceIdQuery;
    }

    async handle(query: GetCategoriesByWorkspaceIdQuery): Promise<CategoriesReadModel> {
        const workspaceId = new ExternalId(query.workspaceId);

        const categoriesByWorkspaceId = await this.categoryRepository.getCategoriesByWorkspaceId(workspaceId);
        if (!categoriesByWorkspaceId) {
            throw new Error();
        }

        return new CategoriesReadModel(categoriesByWorkspaceId);
    }
}
