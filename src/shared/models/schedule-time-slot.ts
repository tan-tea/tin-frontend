import type { InferSelectModel } from 'drizzle-orm';

import { scheduleTimeSlots } from 'lib/db/schema';

export interface ScheduleTimeSlot extends InferSelectModel<typeof scheduleTimeSlots> {}
