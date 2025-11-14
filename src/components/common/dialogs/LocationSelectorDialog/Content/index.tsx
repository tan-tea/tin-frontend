'use client'

import type {
    FC,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Text,
} from 'ui/index';

type LocationSelectorDialogContentProps = {
    t: ReturnType<typeof useTranslations>;
    currentLocation: GeolocationPosition | null;
    onSelectLocation: (location: GeolocationPosition | null) => void;
};

const LocationSelectorDialogContent: FC<LocationSelectorDialogContentProps> = (
    props: LocationSelectorDialogContentProps,
) => {
    'use memo'
    const {
        t,
        currentLocation,
        onSelectLocation,
    } = props;

    return (
        <Box className='size-full flex flex-col gap-y-6'>
            <Text
                variant='body2'
                component='p'
                className='text-xs text-center dark:text-light-400 md:block md:text-left md:text-sm text-gray-800'
            >
                {t('location.dialog.description')}
            </Text>
        </Box>
    );
};

export default LocationSelectorDialogContent;
