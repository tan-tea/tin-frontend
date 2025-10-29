import {
    Color,
    ColorPrimitives
} from 'contexts/wm/color/domain/Color';
import { Variant } from 'contexts/wm/variant/domain/Variant';
import { VariantReadModel } from 'contexts/wm/variant/application/query/read-model/VariantReadModel';

export class ColorReadModel implements ColorPrimitives {
    readonly id: string;
    readonly label: string;
    readonly value: string;
    readonly isDefault: boolean;
    readonly customizationId: string;
    readonly variants?: Array<VariantReadModel>;

    constructor(color: Color, variants?: Array<Variant>) {
        const primitives = color.toPrimitives();

        this.id = primitives.id;
        this.label = primitives.label;
        this.value = primitives.value;
        this.isDefault = primitives.isDefault;
        this.customizationId = primitives.customizationId;
        this.variants = variants?.map?.(v => v.toPrimitives()) || [];
    }
}
