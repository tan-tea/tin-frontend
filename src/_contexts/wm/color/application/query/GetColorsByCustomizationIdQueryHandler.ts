import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { GetColorsByCustomizationIdQuery } from './GetColorsByCustomizationIdQuery';
import { ColorsReadModel } from './read-model/ColorsReadModel';
import { ColorRepository } from '../../domain/ColorRepository';

export class GetColorsByCustomizationIdQueryHandler
    implements QueryHandler<GetColorsByCustomizationIdQuery, ColorsReadModel>
{
    constructor(
        private readonly colorRepository: ColorRepository
    ) {}

    subscribedTo(): Query {
        return GetColorsByCustomizationIdQuery;
    }

    async handle(query: GetColorsByCustomizationIdQuery): Promise<ColorsReadModel> {
        const customizationId = new ExternalId(query.customizationId);

        const colorsByCustomizationId = await this.colorRepository.getColorsByCustomizationId(customizationId);
        if (!colorsByCustomizationId) {
            throw new Error();
        }

        return new ColorsReadModel(colorsByCustomizationId);
    }
}

