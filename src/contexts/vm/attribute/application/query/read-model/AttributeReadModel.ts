import { Attribute, AttributePrimitives } from 'contexts/vm/attribute/domain/Attribute';

export class AttributeReadModel implements AttributePrimitives {
    readonly id: string;
    readonly name: string;
    readonly dataType: string;
    readonly isMultiple: boolean;
    readonly isGlobal: boolean;
    readonly typeId: string;

    constructor(attribute: Attribute) {
        const primitives = attribute.toPrimitives();

        this.id = primitives.id;
        this.name = primitives.name;
        this.dataType = primitives.dataType;
        this.isMultiple = primitives.isMultiple;
        this.isGlobal = primitives.isGlobal;
        this.typeId = primitives.typeId;
    }
}
