import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { GetAttributesByTypeIdQuery } from './GetAttributesByTypeIdQuery';
import { AttributesReadModel } from './read-model/AttributesReadModel';
import { AttributeRepository } from '../../domain/AttributeRepository';

export class GetAttributesByTypeIdQueryHandler
    implements QueryHandler<GetAttributesByTypeIdQuery, AttributesReadModel>
{
    constructor(
        private readonly attributeRepository: AttributeRepository,
    ) {}

    subscribedTo(): Query {
        return GetAttributesByTypeIdQuery;
    }

    async handle(query: GetAttributesByTypeIdQuery): Promise<AttributesReadModel> {
        const typeId = new ExternalId(query.typeId);

        const attributesByTypeId = await this.attributeRepository.getAttributesByTypeId(typeId);
        if (!attributesByTypeId) {
            throw new Error();
        }

        return new AttributesReadModel(attributesByTypeId);
    }
}

