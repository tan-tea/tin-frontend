import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { Timestamp } from 'contexts/shared/domain/value-object/Timestamp';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { ShopId } from './value-object/ShopId';
import { ShopName } from './value-object/ShopName';
import { ShopIsPrimary } from './value-object/ShopIsPrimary';
import { ShopIsVerified } from './value-object/ShopIsVerified';

export interface ShopPrimitives {
    id: string;
    workspaceId: string;
    name: string;
    isPrimary: boolean;
    isVerified: boolean;
    createdAt: Date;
}

export class Shop extends AggregateRoot {
    readonly id: ShopId;
    readonly workspaceId: ExternalId;
    readonly name: ShopName;
    readonly isPrimary: ShopIsPrimary;
    readonly isVerified: ShopIsVerified;
    readonly createdAt: Timestamp;

    constructor(
        id: ShopId,
        workspaceId: ExternalId,
        name: ShopName,
        isPrimary: ShopIsPrimary,
        isVerified: ShopIsVerified,
        createdAt: Timestamp,
    ) {
        super();

        this.id = id;
        this.workspaceId = workspaceId;
        this.name = name;
        this.isPrimary = isPrimary;
        this.isVerified = isVerified;
        this.createdAt = createdAt;
    }

    static create(
        workspaceId: ExternalId,
        name: ShopName,
        isPrimary?: ShopIsPrimary,
        isVerified?: ShopIsVerified,
    ): Shop {
        return new Shop(
            ShopId.random(),
            workspaceId,
            name,
            isPrimary ?? new ShopIsPrimary(false),
            isVerified ?? new ShopIsVerified(false),
            new Timestamp(new Date()),
        );
    }

    static fromPrimitives(primitives: ShopPrimitives): Shop {
        return new Shop(
            new ShopId(primitives.id),
            new ExternalId(primitives.workspaceId),
            new ShopName(primitives.name),
            new ShopIsPrimary(primitives.isPrimary),
            new ShopIsVerified(primitives.isVerified),
            new Timestamp(primitives.createdAt),
        );
    }

    toPrimitives(): ShopPrimitives {
        return {
            id: this.id.value,
            workspaceId: this.workspaceId.value,
            name: this.name.value,
            isPrimary: this.isPrimary.value,
            isVerified: this.isVerified.value,
            createdAt: this.createdAt.value,
        };
    }
}
