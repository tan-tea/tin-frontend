import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { AttributeId } from './value-object/AttributeId';
import { AttributeName } from './value-object/AttributeName';
import { AttributeDataType } from './value-object/AttributeDataType';
import { AttributeIsMultiple } from './value-object/AttributeIsMultiple';
import { AttributeIsGlobal } from './value-object/AttributeIsGlobal';

export interface AttributePrimitives {
    id: string;
    name: string;
    dataType: string;
    isMultiple: boolean;
    isGlobal: boolean;
    typeId: string;
}

export class Attribute extends AggregateRoot {
    readonly id: AttributeId;
    readonly name: AttributeName;
    readonly dataType: AttributeDataType;
    readonly isMultiple: AttributeIsMultiple;
    readonly isGlobal: AttributeIsGlobal;
    readonly typeId: ExternalId;

    constructor(
        id: AttributeId,
        name: AttributeName,
        dataType: AttributeDataType,
        isMultiple: AttributeIsMultiple,
        isGlobal: AttributeIsGlobal,
        typeId: ExternalId,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.dataType = dataType;
        this.isMultiple = isMultiple;
        this.isGlobal = isGlobal;
        this.typeId = typeId;
    }

    static fromPrimitives(primitives: AttributePrimitives): Attribute {
        return new Attribute(
            new AttributeId(primitives.id),
            new AttributeName(primitives.name),
            new AttributeDataType(primitives.dataType),
            new AttributeIsMultiple(primitives.isMultiple),
            new AttributeIsGlobal(primitives.isGlobal),
            new ExternalId(primitives.typeId),
        );
    }

    toPrimitives(): AttributePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            dataType: this.dataType.value,
            isMultiple: this.isMultiple.value,
            isGlobal: this.isGlobal.value,
            typeId: this.typeId.value,
        };
    }
}
