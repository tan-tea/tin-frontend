import { Query } from 'contexts/shared/domain/Query';
import { QueryHandler } from 'contexts/shared/domain/QueryHandler';
import { WorkspaceId } from 'contexts/wm/workspace/domain/value-object/WorkspaceId';
import { WorkspaceRepository } from 'contexts/wm/workspace/domain/WorkspaceRepository';

import { GetWorkspaceByIdQuery } from './GetWorkspaceByIdQuery';
import { WorkspaceReadModel } from './read-model/WorkspaceReadModel';

export class GetWorkspaceByIdQueryHandler
implements QueryHandler<GetWorkspaceByIdQuery, WorkspaceReadModel> {
    constructor(
        private readonly workspaceRepository: WorkspaceRepository
    ) {}

    subscribedTo(): Query {
        return GetWorkspaceByIdQuery;
    }

    async handle(query: GetWorkspaceByIdQuery): Promise<WorkspaceReadModel> {
        const id = new WorkspaceId(query.workspaceId);

        const workspaceById = await this.workspaceRepository.getById(id);
        if (!workspaceById) {
            throw new Error();
        }

        return new WorkspaceReadModel(workspaceById);
    }
}
