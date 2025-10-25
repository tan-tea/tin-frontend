import { Query } from 'contexts/shared/domain/Query';

export class GetShopsByWorkspaceIdQuery extends Query {
    constructor(public readonly workspaceId: string) {
        super();
    }
}
