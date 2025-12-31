'use client'

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import { useStoreAvailability } from 'shared/hooks';

import { IconLabel } from 'ui/text';
import { Clock } from 'components/icons';

type StoreAvailabilityProps = Readonly<object>;

const StoreAvailability: FC<StoreAvailabilityProps> = () => {
    'use memo'
    const t = useTranslations();

    const { isOpen } = useStoreAvailability()

    return (
        <IconLabel
            icon={Clock}
            label={isOpen ? t('open') : t('close')}
        />
    );
};

export default StoreAvailability;
