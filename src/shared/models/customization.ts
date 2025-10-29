import { CustomizationReadModel } from 'contexts/wm/customization/application/query/read-model/CustomizationReadModel';
import { Color } from './color';

export interface Customization extends CustomizationReadModel {
    colors: Array<Color>;
}
