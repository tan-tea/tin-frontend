import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { GetValuesByAttributeIdQuery } from './GetValuesByAttributeIdQuery';
import { ValuesReadModel } from './read-model/ValuesReadModel';
import { ValueRepository } from '../../domain/ValueRepository';

export class GetValuesByAttributeIdQueryHandler
    implements QueryHandler<GetValuesByAttributeIdQuery, ValuesReadModel>
{
    constructor(
        private readonly valueRepository: ValueRepository,
    ) {}

    subscribedTo(): Query {
        return GetValuesByAttributeIdQuery;
    }

    async handle(query: GetValuesByAttributeIdQuery): Promise<ValuesReadModel> {
        const attributeId = new ExternalId(query.attributeId);

        const valuesByAttributeId = await this.valueRepository.getValuesByAttributeId(attributeId);
        if (!valuesByAttributeId) {
            throw new Error();
        }

        return new ValuesReadModel(valuesByAttributeId);
    }
}

