import type { InferSelectModel } from 'drizzle-orm';

import { customizations } from 'lib/db/schema';

import { Color } from './color';

export interface Customization extends InferSelectModel<typeof customizations> {
    colors?: Array<Color>;
}
