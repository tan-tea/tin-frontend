'use client'

import type { FC } from 'react';
import type { Shop } from 'shared/models';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { useScheduleAvailability } from 'shared/hooks';

import { IconLabel } from 'ui/text';
import { Clock } from 'components/icons';

type Props = Readonly<{
    shop: Shop;
}>;

const StoreAvailability: FC<Props> = ({
    shop,
}) => {
    'use memo'
    const t = useTranslations();

    const schedule = useMemo(
        () => {
            const now = new Date();
            const today = now.getDay();
            return (shop?.schedules ?? [])
                .find(s => s.dayOfWeek === today);
        },
        [shop],
    );

    const { isOpen } = useScheduleAvailability(schedule);

    return (
        <IconLabel
            icon={Clock}
            label={isOpen ? t('open') : t('close')}
        />
    );
};

export default StoreAvailability;
