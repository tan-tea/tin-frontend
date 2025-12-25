import { WorkspaceReadModel } from 'contexts/wm/workspace/application/query/read-model/WorkspaceReadModel';

import { Shop } from './shop';
import { Category } from './category';
import { Segment } from './segment';

export interface Workspace extends WorkspaceReadModel {
    slug: string;
    shops: Array<Shop>;
    categories: Array<Category>;
    segmentId: string;
    segment: Segment;
}
