import { InferSelectModel } from 'drizzle-orm';

import { customizationColors } from 'lib/db/schema';

import { Variant } from './variant';

export interface Color extends InferSelectModel<typeof customizationColors> {
    variants?: Array<Variant>;
}
