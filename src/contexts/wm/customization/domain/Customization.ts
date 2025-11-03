import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { CustomizationId } from './value-object/CustomizationId';
import { CustomizationLogo } from './value-object/CustomizationLogo';
import { CustomizationFont } from './value-object/CustomizationFont';
import { CustomizationShowName } from './value-object/CustomizationShowName';

export interface CustomizationPrimitives {
    id: string;
    logo: string;
    fontPrimary: string;
    fontSecondary: string;
    showName: boolean;
    workspaceId: string;
}

export class Customization extends AggregateRoot {
    readonly id: CustomizationId;
    readonly logo: CustomizationLogo;
    readonly fontPrimary: CustomizationFont;
    readonly fontSecondary: CustomizationFont;
    readonly showName: CustomizationShowName;
    readonly workspaceId: ExternalId;

    constructor(
        id: CustomizationId,
        logo: CustomizationLogo,
        fontPrimary: CustomizationFont,
        fontSecondary: CustomizationFont,
        showName: CustomizationShowName,
        workspaceId: ExternalId,
    ) {
        super();

        this.id = id;
        this.logo = logo;
        this.fontPrimary = fontPrimary;
        this.fontSecondary = fontSecondary;
        this.showName = showName;
        this.workspaceId = workspaceId;
    }

    static fromPrimitives(primitives: CustomizationPrimitives): Customization {
        return new Customization(
            new CustomizationId(primitives.id),
            new CustomizationLogo(primitives.logo),
            new CustomizationFont(primitives.fontPrimary),
            new CustomizationFont(primitives.fontSecondary),
            new CustomizationShowName(primitives.showName),
            new ExternalId(primitives.workspaceId),
        );
    }

    toPrimitives(): CustomizationPrimitives {
        return {
            id: this.id.value,
            logo: this.logo.value,
            fontPrimary: this.fontPrimary.value,
            fontSecondary: this.fontSecondary.value,
            showName: this.showName.value,
            workspaceId: this.workspaceId.value,
        };
    }

}
