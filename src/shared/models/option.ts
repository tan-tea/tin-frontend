import type { InferSelectModel } from 'drizzle-orm';

import { options } from 'lib/db/schema';

export interface Option extends InferSelectModel<typeof options> {}
