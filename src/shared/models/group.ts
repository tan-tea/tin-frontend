import type { InferSelectModel } from 'drizzle-orm';

import { optionGroups } from 'lib/db/schema';

import { Option } from './option';

export interface Group extends InferSelectModel<typeof optionGroups> {
    options: Array<Option>;
}
