import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { AttributeId } from './value-object/AttributeId';
import { AttributeName } from './value-object/AttributeName';
import { AttributeDataType } from './value-object/AttributeDataType';

export interface AttributePrimitives {
    id: string;
    name: string;
    dataType: string;
    typeId: string;
}

export class Attribute extends AggregateRoot {
    readonly id: AttributeId;
    readonly name: AttributeName;
    readonly dataType: AttributeDataType;
    readonly typeId: ExternalId;

    constructor(
        id: AttributeId,
        name: AttributeName,
        dataType: AttributeDataType,
        typeId: ExternalId,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.dataType = dataType;
        this.typeId = typeId;
    }

    static fromPrimitives(primitives: AttributePrimitives): Attribute {
        return new Attribute(
            new AttributeId(primitives.id),
            new AttributeName(primitives.name),
            new AttributeDataType(primitives.dataType),
            new ExternalId(primitives.typeId),
        );
    }

    toPrimitives(): AttributePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            dataType: this.dataType.value,
            typeId: this.typeId.value,
        };
    }
}
