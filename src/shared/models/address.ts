import type { InferSelectModel } from 'drizzle-orm';

import { addresses } from 'lib/db/schema';

export interface Address extends InferSelectModel<typeof addresses> {}
