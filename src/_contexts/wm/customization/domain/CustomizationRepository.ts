import { Color } from 'contexts/wm/color/domain/Color';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { Customization } from './Customization';

export interface CustomizationRepository {
    getCustomizationByWorkspaceId(workspaceId: ExternalId): Promise<Customization | null>;
    getCustomizationFullByWorkspaceId(workspaceId: ExternalId): Promise<Customization & {
        colors: Array<Color>;
    } | null>;
}
