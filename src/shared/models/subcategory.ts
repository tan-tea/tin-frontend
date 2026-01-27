import type { InferSelectModel } from 'drizzle-orm';

import { subcategories } from 'lib/db/schema';

export interface Subcategory extends InferSelectModel<typeof subcategories> {}
