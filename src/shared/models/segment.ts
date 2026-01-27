import type { InferSelectModel } from 'drizzle-orm';

import { segments } from 'lib/db/schema';

export interface Segment extends InferSelectModel<typeof segments> {}
