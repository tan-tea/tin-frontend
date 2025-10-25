import { WorkspaceReadModel } from 'contexts/wm/workspace/application/query/read-model/WorkspaceReadModel';

import { Shop } from './shop';
import { Category } from './category';

export interface Workspace extends WorkspaceReadModel {
    shops: Array<Shop>;
    categories: Array<Category>;
}
