import { ColorReadModel } from 'contexts/wm/color/application/query/read-model/ColorReadModel';
import { Variant } from './variant';

export interface Color extends ColorReadModel {
    variants: Array<Variant>;
}
