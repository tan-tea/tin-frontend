import type { InferSelectModel } from 'drizzle-orm';

import { workspaces } from 'lib/db/schema';

import { Segment } from './segment';
import { Category } from './category';

export interface Workspace extends InferSelectModel<typeof workspaces> {
    segment: Segment;
    categories: Array<Category>;
}
