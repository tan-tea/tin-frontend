import { InferSelectModel } from 'drizzle-orm';

import { customizationColors } from 'lib/db/schema';

export interface Color extends InferSelectModel<typeof customizationColors> {}
