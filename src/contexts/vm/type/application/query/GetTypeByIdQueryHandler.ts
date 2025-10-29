import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';

import { GetTypeByIdQuery } from './GetTypeByIdQuery';
import { TypeReadModel } from './read-model/TypeReadModel';
import { TypeId } from '../../domain/value-object/TypeId';
import { TypeRepository } from '../../domain/TypeRepository';

export class GetTypeByIdQueryHandler implements QueryHandler<GetTypeByIdQuery, TypeReadModel> {
    constructor(
        private readonly typeRepository: TypeRepository,
    ) {}

    subscribedTo(): Query {
        return GetTypeByIdQuery;
    }

    async handle(query: GetTypeByIdQuery): Promise<TypeReadModel> {
        const typeId = new TypeId(query.id);

        const typeById = await this.typeRepository.getTypeById(typeId);
        if (!typeById) {
            throw new Error();
        }

        return new TypeReadModel(typeById);
    }
}
