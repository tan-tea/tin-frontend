'use client'

import type { FC } from 'react';

import {
    useState,
    useEffect,
} from 'react';
import { tv } from 'tailwind-variants';
import { useTranslations } from 'next-intl';

import { cn } from 'lib/utils';

import type {
    Schedule,
} from 'shared/models';

import { Paragraph } from 'ui/text';
import {
    Icon,
    Clock,
} from 'components/icons';

const availability = tv({
    slots: {
        root: cn('flex items-center gap-x-2'),
        indicator: cn('h-4 w-4 rounded-full'),
    },
    variants: {
        active: {
            true: {
                indicator: 'bg-green-500'
            },
            false: {
                indicator: 'bg-red-500',
            },
        },
    },
})

type StoreAvailabilityProps = Readonly<{
    schedule: Schedule | null;
}>;

const StoreAvailability: FC<StoreAvailabilityProps> = ({
    schedule,
}) => {
    'use memo'
    const t = useTranslations();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        root,
        indicator,
    } = availability({
        active: isOpen,
    })

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

    return (
        <div className={root()}>
            <Icon value={Clock}/>
            <Paragraph truncate>
                {isOpen ? t('open') : t('close')}
            </Paragraph>
        </div>
    );
};

export default StoreAvailability;
