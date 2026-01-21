import { Query } from "contexts/shared/domain/Query";

export class GetCategoryByIdQuery extends Query {
    constructor(public readonly id: string) {
        super();
    }
}
