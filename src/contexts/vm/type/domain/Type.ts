import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';

import { TypeId } from './value-object/TypeId';
import { TypeName } from './value-object/TypeName';
import { TypeCode } from './value-object/TypeCode';

export interface TypePrimitives {
    id: string;
    name: string;
    code: string;
}

export class Type extends AggregateRoot {
    readonly id: TypeId;
    readonly name: TypeName;
    readonly code: TypeCode;

    constructor(
        id: TypeId,
        name: TypeName,
        code: TypeCode,
    ) {
        super();

        this.id = id;
        this.name = name;
        this.code = code;
    }

    static fromPrimitives(primitives: TypePrimitives): Type {
        return new Type(
            new TypeId(primitives.id),
            new TypeName(primitives.name),
            new TypeCode(primitives.code),
        );
    }

    toPrimitives(): TypePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            code: this.code.value,
        };
    }
}
