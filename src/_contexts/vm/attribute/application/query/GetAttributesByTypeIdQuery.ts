import { Query } from 'contexts/shared/domain/Query';

export class GetAttributesByTypeIdQuery extends Query {
    constructor(public readonly typeId: string) {
        super();
    }
}
