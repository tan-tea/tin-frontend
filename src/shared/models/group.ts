import type { InferSelectModel } from 'drizzle-orm';

import { optionGroups } from 'lib/db/schema';

export interface Group extends InferSelectModel<typeof optionGroups> {}
