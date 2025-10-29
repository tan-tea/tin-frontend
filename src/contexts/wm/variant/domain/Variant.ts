import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { VariantId } from './value-object/VariantId';
import { VariantCode } from './value-object/VariantCode';
import { VariantHex } from './value-object/VariantHex';
import { VariantColorChannel } from './value-object/VariantColorChannel';
import { VariantAlpha } from './value-object/VariantAlpha';
import { VariantIsMain } from './value-object/VariantIsMain';

export interface VariantPrimitives {
    id: string;
    code: string;
    hex: string;
    r: number;
    g: number;
    b: number;
    alpha: number;
    isMain: boolean;
    colorId: string;
}

export class Variant extends AggregateRoot {
    readonly id: VariantId;
    readonly code: VariantCode;
    readonly hex: VariantHex;
    readonly r: VariantColorChannel;
    readonly g: VariantColorChannel;
    readonly b: VariantColorChannel;
    readonly alpha: VariantAlpha;
    readonly isMain: VariantIsMain;
    readonly colorId: ExternalId;

    constructor(
        id: VariantId,
        code: VariantCode,
        hex: VariantHex,
        r: VariantColorChannel,
        g: VariantColorChannel,
        b: VariantColorChannel,
        alpha: VariantAlpha,
        isMain: VariantIsMain,
        colorId: ExternalId,
    ) {
        super();

        this.id = id;
        this.code = code;
        this.hex = hex;
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha;
        this.isMain = isMain;
        this.colorId = colorId;
    }

    static fromPrimitives(primitives: VariantPrimitives): Variant {
        return new Variant(
            new VariantId(primitives.id),
            new VariantCode(primitives.code),
            new VariantHex(primitives.hex),
            new VariantColorChannel(primitives.r),
            new VariantColorChannel(primitives.g),
            new VariantColorChannel(primitives.b),
            new VariantAlpha(primitives.alpha),
            new VariantIsMain(primitives.isMain),
            new ExternalId(primitives.colorId),
        );
    }

    toPrimitives(): VariantPrimitives {
        return {
            id: this.id.value,
            code: this.code.value,
            hex: this.hex.value,
            r: this.r.value,
            g: this.g.value,
            b: this.b.value,
            alpha: this.alpha.value,
            isMain: this.isMain.value,
            colorId: this.colorId.value,
        };
    }
}
