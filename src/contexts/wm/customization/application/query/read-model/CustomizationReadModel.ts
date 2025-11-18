import {
    Customization,
    SocialMedia,
    CustomizationPrimitives,
} from 'contexts/wm/customization/domain/Customization';
import { Color } from 'contexts/wm/color/domain/Color';
import { ColorReadModel } from 'contexts/wm/color/application/query/read-model/ColorReadModel';

export class CustomizationReadModel implements CustomizationPrimitives {
    readonly id: string;
    readonly logo: string;
    readonly fontPrimary: string;
    readonly fontSecondary: string;
    readonly showName: boolean;
    readonly workspaceId: string;
    readonly socialMedia: SocialMedia[];
    readonly colors?: Array<ColorReadModel>;

    constructor(
        customization: Customization,
        colors?: Array<Color>
    ) {
        const primitives = customization.toPrimitives();

        this.id = primitives.id;
        this.logo = primitives.logo;
        this.fontPrimary = primitives.fontPrimary;
        this.fontSecondary = primitives.fontSecondary;
        this.showName = primitives.showName;
        this.workspaceId = primitives.workspaceId;
        this.socialMedia = primitives.socialMedia;
        this.colors = colors?.map?.(c => c.toPrimitives()) || [];
    }
}
