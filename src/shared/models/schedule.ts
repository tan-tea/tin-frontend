import type { InferSelectModel } from 'drizzle-orm';

import { schedules } from 'lib/db/schema';

export interface Schedule extends InferSelectModel<typeof schedules> {}
