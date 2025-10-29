import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';

import { GetCategoryByIdQuery } from './GetCategoryByIdQuery';
import { CategoryReadModel } from './read-model/CategoryReadModel';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { CategoryId } from '../../domain/value-object/CategoryId';

export class GetCategoryByIdQueryHandler
    implements QueryHandler<GetCategoryByIdQuery, CategoryReadModel>
{
    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    subscribedTo(): Query {
        return GetCategoryByIdQuery;
    }

    async handle(query: GetCategoryByIdQuery): Promise<CategoryReadModel> {
        const categoryId = new CategoryId(query.id);

        const categoryById = await this.categoryRepository.getCategoryById(categoryId);
        if (!categoryById) {
            throw new Error();
        }

        return new CategoryReadModel(categoryById);
    }
}
