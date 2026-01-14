'use client'

import type { FC } from 'react';

import { useMemo } from 'react';

import { formatAddress } from 'lib/utils';

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
    if (!address) return null;

    const formatted = useMemo<string>(
        () => formatAddress(address) ?? '',
        [address],
    );

    return (
        <IconLabel
            icon={MapPin}
            label={formatted}
        />
    );
};

export default StoreLocation;
