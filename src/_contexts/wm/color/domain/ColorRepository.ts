import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { Color } from './Color';

export interface ColorRepository {
    getColorsByCustomizationId(customizationId: ExternalId): Promise<Array<Color>>;
}
