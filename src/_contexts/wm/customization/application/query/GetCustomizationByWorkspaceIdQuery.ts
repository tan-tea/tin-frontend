import { Query } from 'contexts/shared/domain/Query';

export class GetCustomizationByWorkspaceIdQuery extends Query {
    constructor(public readonly workspaceId: string) {
        super();
    }
}
