import { Query } from 'contexts/shared/domain/Query';

export class GetTypeByIdQuery extends Query {
    constructor(public readonly id: string) {
        super();
    }
}
