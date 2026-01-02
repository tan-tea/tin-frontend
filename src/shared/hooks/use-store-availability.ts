import {
    useMemo,
    useState,
    useEffect,
} from 'react';
import { useAtomValue } from 'jotai';

import { currentShopAtom } from 'shared/state';

type Result = {
    isOpen: boolean;
};

type Handler = () => Result;

export const useStoreAvailability: Handler = () => {
    const currentShop = useAtomValue(currentShopAtom);

    const schedule = useMemo(
        () => {
            const now = new Date();
            const today = now.getDay();
            return (currentShop?.schedules ?? [])
                .find(s => s.dayOfWeek === today);
        },
        [currentShop],
    );

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
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

        const isOpenNow = schedule.timeSlots.some((slot) => {
            const start = toMinutes(getTimeWithoutTz(slot.startTime));
            const end = toMinutes(getTimeWithoutTz(slot.endTime));

            // horario normal (ej: 08:00 - 18:00)
            if (start <= end) {
                return nowMinutes >= start && nowMinutes <= end;
            }

            // horario que cruza medianoche (ej: 22:00 - 02:00)
            return nowMinutes >= start || nowMinutes <= end;
        });

        setIsOpen(isOpenNow);
    }, [schedule]);

    return {
        isOpen,
    };
};
