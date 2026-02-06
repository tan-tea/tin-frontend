import type { Schedule } from 'shared/models';

import {
    useState,
    useEffect,
} from 'react';

type Result = {
    isOpen: boolean;
};

export function useScheduleAvailability(schedule?: Schedule): Result {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!schedule) {
            setIsOpen(false);
            return;
        }

        const getTimeWithoutTz = (time: string) => time.split('-')[0];

        const toMinutes = (time: string) => {
            const [h, m] = time.split(':').map(Number);
            return h * 60 + m;
        };

        if (!schedule || schedule.isClosed) {
            setIsOpen(false);
            return;
        }

        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();

        const isOpenNow = (schedule.timeSlots ?? []).some((slot) => {
            const start = toMinutes(getTimeWithoutTz(slot.startTime));
            const end = toMinutes(getTimeWithoutTz(slot.endTime));

            if (start <= end) {
                return nowMinutes >= start && nowMinutes <= end;
            }

            return nowMinutes >= start || nowMinutes <= end;
        });

        setIsOpen(isOpenNow);
    }, [schedule]);

    return {
        isOpen,
    };
};
