import type { InferSelectModel } from 'drizzle-orm';

import { schedules } from 'lib/db/schema';

import { ScheduleTimeSlot } from './schedule-time-slot';

export interface Schedule extends InferSelectModel<typeof schedules> {
    timeSlots?: Array<ScheduleTimeSlot>;
}
