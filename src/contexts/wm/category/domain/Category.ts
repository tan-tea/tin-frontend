import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';
import { Timestamp } from 'contexts/shared/domain/value-object/Timestamp';

import { CategoryId } from './value-object/CategoryId';
import { CategoryLabel } from './value-object/CategoryLabel';
import { CategoryDescription } from './value-object/CategoryDescription';
import { CategoryBanner } from './value-object/CategoryBanner';
import { CategoryPosition } from './value-object/CategoryPosition';

export interface CategoryPrimitives {
    id: string;
    label: string;
    description: string;
    banner: string;
    position: number;
    workspaceId: string;
    createdAt: Date;
}

export class Category extends AggregateRoot {
    readonly id: CategoryId;
    readonly label: CategoryLabel;
    readonly description: CategoryDescription;
    readonly banner: CategoryBanner;
    readonly position: CategoryPosition;
    readonly workspaceId: ExternalId;
    readonly createdAt: Timestamp;

    constructor(
        id: CategoryId,
        label: CategoryLabel,
        description: CategoryDescription,
        banner: CategoryBanner,
        position: CategoryPosition,
        workspaceId: ExternalId,
        createdAt: Timestamp,
    ) {
        super();

        this.id = id;
        this.label = label;
        this.description = description;
        this.banner = banner;
        this.position = position;
        this.workspaceId = workspaceId;
        this.createdAt = createdAt;
    }

    static create(
        label: CategoryLabel,
        description: CategoryDescription,
        workspaceId: ExternalId,
        banner?: CategoryBanner,
        position?: CategoryPosition,
    ): Category {
        return new Category(
            CategoryId.random(),
            label,
            description,
            banner ?? new CategoryBanner(''),
            position ?? new CategoryPosition(0),
            workspaceId,
            new Timestamp(new Date()),
        );
    }

    static fromPrimitives(primitives: CategoryPrimitives): Category {
        return new Category(
            new CategoryId(primitives.id),
            new CategoryLabel(primitives.label),
            new CategoryDescription(primitives.description),
            new CategoryBanner(primitives.banner),
            new CategoryPosition(primitives.position),
            new ExternalId(primitives.workspaceId),
            new Timestamp(primitives.createdAt),
        );
    }

    toPrimitives(): CategoryPrimitives {
        return {
            id: this.id.value,
            label: this.label.value,
            description: this.description.value,
            banner: this.banner.value,
            position: this.position.value,
            workspaceId: this.workspaceId.value,
            createdAt: this.createdAt.value,
        };
    }
}
