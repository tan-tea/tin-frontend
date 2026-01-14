import { Workspace, WorkspacePrimitives } from 'contexts/wm/workspace/domain/Workspace';

export class WorkspaceReadModel implements WorkspacePrimitives {
    readonly id: string;
    readonly logo: string;
    readonly name: string;
    readonly description: string;
    readonly tin: string;
    readonly isVerified: boolean;
    readonly createdAt: Date;

    constructor(workspace: Workspace) {
        const primitives = workspace.toPrimitives();

        this.id = primitives.id;
        this.logo = primitives.logo;
        this.name = primitives.name;
        this.description = primitives.description;
        this.tin = primitives.tin;
        this.isVerified = primitives.isVerified;
        this.createdAt = primitives.createdAt;
    }
}
