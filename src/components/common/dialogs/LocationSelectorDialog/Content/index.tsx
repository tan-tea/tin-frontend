'use client'

import type {
    FC,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Typography,
} from 'ui/index';

type LocationSelectorDialogContentProps = {
    t: ReturnType<typeof useTranslations>;
    currentLocation: GeolocationPosition | null;
    onSelectLocation: (location: GeolocationPosition) => void;
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
            <Typography
                variant='body2'
                component='p'
                className='text-xs text-center dark:text-light-400 md:block md:text-left md:text-sm text-gray-800'
            >
                {t('location.dialog.description')}
            </Typography>
        </Box>
    );
};

export default LocationSelectorDialogContent;
