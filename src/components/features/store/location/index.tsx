'use client'

import type { FC } from 'react';

import { useMemo } from 'react';

import type {
    Address,
} from 'shared/models';

import { IconLabel } from 'ui/text';
import { MapPin } from 'components/icons';

type StoreLocationProps = Readonly<{
    address: Address | null;
}>;

const StoreLocation: FC<StoreLocationProps> = ({
    address,
}) => {
    'use memo'
    const formated = useMemo<string>(
        () => {
            return [
                address?.street,
                address?.number,
            ].filter(Boolean).join(' ');
        },
        [address],
    );

    if (!address) return null;

    return (
        <IconLabel
            icon={MapPin}
            label={formated}
        />
    );
};

export default StoreLocation;
