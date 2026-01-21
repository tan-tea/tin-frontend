import { Query } from 'contexts/shared/domain/Query';

export class GetCustomizationFullByWorkspaceIdQuery extends Query {
    constructor(public readonly workspaceId: string) {
        super();
    }
}
