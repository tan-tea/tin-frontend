import { Attribute } from 'contexts/vm/attribute/domain/Attribute';

import { AttributeReadModel } from './AttributeReadModel';

export class AttributesReadModel {
    readonly attributes: Array<AttributeReadModel>;

    constructor(attributes: Array<Attribute>) {
        this.attributes = attributes.map((attribute) => attribute.toPrimitives());
    }
}
