import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { GetCustomizationFullByWorkspaceIdQuery } from './GetCustomizationFullByWorkspaceIdQuery';
import { CustomizationRepository } from '../../domain/CustomizationRepository';

export class GetCustomizationFullByWorkspaceIdQueryHandler
    implements QueryHandler<GetCustomizationFullByWorkspaceIdQuery, any>
{
    constructor(
        private readonly customizationRepository: CustomizationRepository,
    ) {}

    subscribedTo(): Query {
        return GetCustomizationFullByWorkspaceIdQuery;
    }

    async handle(query: GetCustomizationFullByWorkspaceIdQuery): Promise<any> {
        const workspaceId = new ExternalId(query.workspaceId);

        const customization = await this.customizationRepository.getCustomizationFullByWorkspaceId(workspaceId);
        return customization;
    }
}
