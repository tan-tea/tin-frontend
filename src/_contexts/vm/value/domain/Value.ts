import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { ValueId } from './value-object/ValueId';
import { ValueLabel } from './value-object/ValueLabel';
import { ValueValue } from './value-object/ValueValue';

export interface ValuePrimitives {
    id: string;
    label: string;
    value: string;
    offerId: string;
    attributeId: string;
}

export class Value extends AggregateRoot {
    readonly id: ValueId;
    readonly label: ValueLabel;
    readonly value: ValueValue;
    readonly offerId: ExternalId;
    readonly attributeId: ExternalId;

    constructor(
        id: ValueId,
        label: ValueLabel,
        value: ValueValue,
        offerId: ExternalId,
        attributeId: ExternalId,
    ) {
        super();

        this.id = id;
        this.label = label;
        this.value = value;
        this.offerId = offerId;
        this.attributeId = attributeId;
    }

    static fromPrimitive(primitives: ValuePrimitives): Value {
        return new Value(
            new ValueId(primitives.id),
            new ValueLabel(primitives.label),
            new ValueValue(primitives.value),
            new ExternalId(primitives.offerId),
            new ExternalId(primitives.attributeId),
        );
    }

    toPrimitives(): ValuePrimitives {
        return {
            id: this.id.value,
            label: this.label.value,
            value: this.value.value,
            offerId: this.offerId.value,
            attributeId: this.attributeId.value,
        };
    }
}
