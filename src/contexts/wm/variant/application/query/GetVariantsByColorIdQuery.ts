import { Query } from 'contexts/shared/domain/Query';

export class GetVariantsByColorIdQuery extends Query {
    constructor(public readonly colorId: string) {
        super();
    }
}
