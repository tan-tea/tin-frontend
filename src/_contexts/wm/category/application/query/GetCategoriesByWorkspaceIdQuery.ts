import { Query } from 'contexts/shared/domain/Query';

export class GetCategoriesByWorkspaceIdQuery extends Query {
    constructor(
        public readonly workspaceId: string,
        public readonly locale: string,
    ) {
        super();
    }
}
