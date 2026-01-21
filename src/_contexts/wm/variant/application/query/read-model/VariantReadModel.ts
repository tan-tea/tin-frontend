import { Variant, VariantPrimitives } from 'contexts/wm/variant/domain/Variant';

export class VariantReadModel implements VariantPrimitives {
    id: string;
    code: string;
    hex: string;
    r: number;
    g: number;
    b: number;
    alpha: number;
    isMain: boolean;
    colorId: string;

    constructor(variant: Variant) {
        const primitives = variant.toPrimitives();

        this.id = primitives.id;
        this.code = primitives.code;
        this.hex = primitives.hex;
        this.r = primitives.r;
        this.g = primitives.g;
        this.b = primitives.b;
        this.alpha = primitives.alpha;
        this.isMain = primitives.isMain;
        this.colorId = primitives.colorId;
    }
}
