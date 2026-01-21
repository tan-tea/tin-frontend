import { Query } from 'contexts/shared/domain/Query';

export class GetOffersByShopIdQuery extends Query {
    constructor(public readonly shopId: string) {
        super();
    }
}
