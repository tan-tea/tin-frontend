import { Variant } from 'contexts/wm/variant/domain/Variant';

import { VariantReadModel } from './VariantReadModel';

export class VariantsReadModel {
    readonly variants: Array<VariantReadModel>;

    constructor(variants: Array<Variant>) {
        this.variants = variants.map((variant) => variant.toPrimitives());
    }
}
