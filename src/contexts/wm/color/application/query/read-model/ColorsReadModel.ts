import { Color } from 'contexts/wm/color/domain/Color';

import { ColorReadModel } from './ColorReadModel';

export class ColorsReadModel {
    readonly colors: Array<ColorReadModel>;

    constructor(colors: Array<Color>) {
        this.colors = colors.map((color) => color.toPrimitives());
    }
}
