import type { InferSelectModel } from 'drizzle-orm';

import { customizations } from 'lib/db/schema';

export interface Customization extends InferSelectModel<typeof customizations> {}
