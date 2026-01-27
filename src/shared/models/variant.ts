import type { InferSelectModel } from 'drizzle-orm';

import { customizationColorVariants } from 'lib/db/schema';

export interface Variant extends InferSelectModel<typeof customizationColorVariants> {}
