import { Query } from 'contexts/shared/domain/Query';

export class GetWorkspaceByIdQuery extends Query {
    constructor(public readonly workspaceId: string) {
        super();
    }
}
