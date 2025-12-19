import { TimeSlot } from './time-slot';

export interface Schedule {
    id: string;
    shopId: string;
    dayOfWeek: number;
    isClosed: boolean;
    timeSlots: Array<TimeSlot>;
}
