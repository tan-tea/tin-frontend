import type { InferSelectModel } from 'drizzle-orm';

import { categories } from 'lib/db/schema';

export interface Category extends InferSelectModel<typeof categories> {}
