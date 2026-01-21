import { Query } from 'contexts/shared/domain/Query';

export class GetColorsByCustomizationIdQuery extends Query {
    constructor(public readonly customizationId: string) {
        super();
    }
}
