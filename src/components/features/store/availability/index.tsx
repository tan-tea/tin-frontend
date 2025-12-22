'use client'

import type { FC } from 'react';

import {
    useState,
    useEffect,
} from 'react';
import { useTranslations } from 'next-intl';

import type {
    Schedule,
} from 'shared/models';

import { IconLabel } from 'ui/text';
import { Clock } from 'components/icons';

type StoreAvailabilityProps = Readonly<{
    schedule: Schedule | null;
}>;

const StoreAvailability: FC<StoreAvailabilityProps> = ({
    schedule,
}) => {
    'use memo'
    const t = useTranslations();

    const [isOpen, setIsOpen] = useState<boolean>(false);

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

        const isOpenNow = schedule.timeSlots.some(slot => {
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
    }, [schedule,]);

    if (!schedule) return null;

    return (
        <IconLabel
            icon={Clock}
            label={isOpen ? t('open') : t('close')}
        />
    );
};

export default StoreAvailability;
