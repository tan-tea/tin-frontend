import { Workspace } from './Workspace';
import { WorkspaceId } from './value-object/WorkspaceId';

export interface WorkspaceRepository {
    getAll(): Promise<Array<Workspace>>;
    getById(id: WorkspaceId): Promise<Workspace | null>;
}
