import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { ColorId } from './value-object/ColorId';
import { ColorLabel } from './value-object/ColorLabel';
import { ColorValue } from './value-object/ColorValue';
import { ColorIsDefault } from './value-object/ColorIsDefault';

export interface ColorPrimitives {
    id: string;
    label: string;
    value: string;
    isDefault: boolean;
    customizationId: string;
}

export class Color extends AggregateRoot {
    readonly id: ColorId;
    readonly label: ColorLabel;
    readonly value: ColorValue;
    readonly isDefault: ColorIsDefault;
    readonly customizationId: ExternalId;

    constructor(
        id: ColorId,
        label: ColorLabel,
        value: ColorValue,
        isDefault: ColorIsDefault,
        customizationId: ExternalId,
    ) {
        super();

        this.id = id;
        this.label = label;
        this.value = value;
        this.isDefault = isDefault;
        this.customizationId = customizationId;
    }

    static fromPrimitives(primitives: ColorPrimitives): Color {
        return new Color(
            new ColorId(primitives.id),
            new ColorLabel(primitives.label),
            new ColorValue(primitives.value),
            new ColorIsDefault(primitives.isDefault),
            new ExternalId(primitives.customizationId),
        );
    }

    toPrimitives(): ColorPrimitives {
        return {
            id: this.id.value,
            label: this.label.value,
            value: this.value.value,
            isDefault: this.isDefault.value,
            customizationId: this.customizationId.value,
        };
    }
}
