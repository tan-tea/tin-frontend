import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { VariantsReadModel } from './read-model/VariantsReadModel';
import { GetVariantsByColorIdQuery } from './GetVariantsByColorIdQuery';
import { VariantRepository } from '../../domain/VariantRepository';

export class GetVariantsByColorIdQueryHandler implements QueryHandler<GetVariantsByColorIdQuery, VariantsReadModel> {
    constructor(
        private readonly variantRepository: VariantRepository,
    ) {}

    subscribedTo(): Query {
        return GetVariantsByColorIdQuery;
    }

    async handle(query: GetVariantsByColorIdQuery): Promise<VariantsReadModel> {
        const colorId = new ExternalId(query.colorId);

        const variantsByColorId = await this.variantRepository.getVariantsByColorId(colorId);
        if (!variantsByColorId) {
            throw new Error();
        }

        return new VariantsReadModel(variantsByColorId);
    }
}
