import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { Timestamp } from 'contexts/shared/domain/value-object/Timestamp';

import { WorkspaceId } from './value-object/WorkspaceId';
import { WorkspaceLogo } from './value-object/WorkspaceLogo';
import { WorkspaceName } from './value-object/WorkspaceName';
import { WorkspaceDescription } from './value-object/WorkspaceDescription';
import { WorkspaceTin } from './value-object/WorkspaceTin';
import { WorkspaceIsVerified } from './value-object/WorkspaceIsVerified';

export interface WorkspacePrimitives {
    id: string;
    logo: string;
    name: string;
    description: string;
    tin: string;
    isVerified: boolean;
    createdAt: Date;
    shopsIds?: Array<any>;
}

export class Workspace extends AggregateRoot {
    readonly id: WorkspaceId;
    readonly logo: WorkspaceLogo;
    readonly name: WorkspaceName;
    readonly description: WorkspaceDescription;
    readonly tin: WorkspaceTin;
    readonly isVerified: WorkspaceIsVerified;
    readonly createdAt: Timestamp;
    readonly shopsIds: Array<any> = [];

    constructor(
        id: WorkspaceId,
        logo: WorkspaceLogo,
        name: WorkspaceName,
        description: WorkspaceDescription,
        tin: WorkspaceTin,
        isVerified: WorkspaceIsVerified,
        createdAt: Timestamp,
    ) {
        super();

        this.id = id;
        this.logo = logo;
        this.name = name;
        this.description = description;
        this.tin = tin;
        this.isVerified = isVerified;
        this.createdAt = createdAt;
    }

    static create(
        logo: WorkspaceLogo,
        name: WorkspaceName,
        description: WorkspaceDescription,
        tin: WorkspaceTin,
        isVerified: WorkspaceIsVerified,
    ): Workspace {
        return new Workspace(
            WorkspaceId.random(),
            logo,
            name,
            description,
            tin,
            isVerified,
            new Timestamp(new Date()),
        );
    }

    static fromPrimitives(primitives: WorkspacePrimitives): Workspace {
        return new Workspace(
            new WorkspaceId(primitives.id),
            new WorkspaceLogo(primitives.logo),
            new WorkspaceName(primitives.name),
            new WorkspaceDescription(primitives.description),
            new WorkspaceTin(primitives.tin),
            new WorkspaceIsVerified(primitives.isVerified),
            new Timestamp(primitives.createdAt),
        );
    }

    toPrimitives(): WorkspacePrimitives {
        return {
            id: this.id.value,
            logo: this.logo.value,
            name: this.name.value,
            description: this.description.value,
            tin: this.tin.value,
            isVerified: this.isVerified.value,
            createdAt: this.createdAt.value,
        };
    }
}
