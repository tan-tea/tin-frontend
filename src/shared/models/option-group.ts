import type { InferSelectModel } from 'drizzle-orm';

import { offerOptionGroups } from 'lib/db/schema';

export interface OptionGroup extends InferSelectModel<typeof offerOptionGroups> {}
