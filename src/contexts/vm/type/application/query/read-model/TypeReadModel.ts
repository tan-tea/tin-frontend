import { Type, TypePrimitives } from 'contexts/vm/type/domain/Type';

export class TypeReadModel implements TypePrimitives {
    readonly id: string;
    readonly name: string;
    readonly code: string;

    constructor(type: Type) {
        const primitives = type.toPrimitives();

        this.id = primitives.id;
        this.name = primitives.name;
        this.code = primitives.code;
    }
}
