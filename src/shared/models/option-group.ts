import type { InferSelectModel } from 'drizzle-orm';

import { offerOptionGroups } from 'lib/db/schema';

import { Group } from './group';

export interface OptionGroup extends InferSelectModel<typeof offerOptionGroups> {
    group: Group;
}
