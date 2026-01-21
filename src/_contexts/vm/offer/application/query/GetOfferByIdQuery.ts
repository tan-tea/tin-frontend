import { Query } from 'contexts/shared/domain/Query';

export class GetOfferByIdQuery extends Query {
    constructor(public readonly id: string) {
        super();
    }
}
