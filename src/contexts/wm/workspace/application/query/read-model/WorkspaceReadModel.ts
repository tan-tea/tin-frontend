import { Workspace } from 'contexts/wm/workspace/domain/Workspace';

export class WorkspaceReadModel {
    readonly id: string;
    readonly logo: string;
    readonly name: string;
    readonly description: string;
    readonly tin: string;
    readonly isVerified: boolean;
    readonly createdAt: Date;
    readonly shopsIds?: any[] | undefined;

    constructor(workspace: Workspace) {
        const primitives = workspace.toPrimitives();

        this.id = primitives.id;
        this.logo = primitives.logo;
        this.name = primitives.name;
        this.description = primitives.description;
        this.tin = primitives.tin;
        this.isVerified = primitives.isVerified;
        this.createdAt = primitives.createdAt;
        this.shopsIds = primitives.shopsIds;
    }
}
