import { Query } from 'contexts/shared/domain/Query';

export class GetValuesByAttributeIdQuery extends Query {
    constructor(public readonly attributeId: string) {
        super();
    }
}
