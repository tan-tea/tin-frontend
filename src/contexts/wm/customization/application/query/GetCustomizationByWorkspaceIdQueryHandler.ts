import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { CustomizationReadModel } from './read-model/CustomizationReadModel';
import { CustomizationRepository } from '../../domain/CustomizationRepository';
import { GetCustomizationByWorkspaceIdQuery } from './GetCustomizationByWorkspaceIdQuery';

export class GetCustomizationByWorkspaceIdQueryHandler
    implements QueryHandler<GetCustomizationByWorkspaceIdQuery, CustomizationReadModel>
{
    constructor(
        private readonly customizationRepository: CustomizationRepository,
    ) {}

    subscribedTo(): Query {
        return GetCustomizationByWorkspaceIdQuery;
    }

    async handle(query: GetCustomizationByWorkspaceIdQuery): Promise<CustomizationReadModel> {
        const workspaceId = new ExternalId(query.workspaceId);

        const customizationByWorkspaceId = await this.customizationRepository.getCustomizationByWorkspaceId(workspaceId);
        if (!customizationByWorkspaceId) {
            throw new Error();
        }

        return new CustomizationReadModel(customizationByWorkspaceId);
    }
}
