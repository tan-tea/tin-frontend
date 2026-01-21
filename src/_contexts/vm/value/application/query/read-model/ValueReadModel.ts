import { Value, ValuePrimitives } from 'contexts/vm/value/domain/Value';

export class ValueReadModel implements ValuePrimitives {
    id: string;
    label: string;
    value: string;
    offerId: string;
    attributeId: string;

    constructor(value: Value) {
        const primitives = value.toPrimitives();

        this.id = primitives.id;
        this.label = primitives.label;
        this.value = primitives.value;
        this.offerId = primitives.offerId;
        this.attributeId = primitives.attributeId;
    }
}
