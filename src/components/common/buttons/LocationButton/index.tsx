'use client';

import {
    useEffect,
    type FC,
    type MouseEventHandler,
} from 'react';
import { useTranslations, } from 'next-intl';

import { useDialog } from 'shared/contexts/dialog';

import {
    Box,
    Tooltip,
    IconButton,
} from 'ui/index';
import { MapPin } from 'icons/index';

import LocationSelectorDialog from 'common/dialogs/LocationSelectorDialog';

type LocationButtonProps = object;

const LocationButton: FC<LocationButtonProps> = () => {
    'use memo'
    const t = useTranslations('language');

    const {
        mountDialog,
        openDialog,
        isDialogOpen,
    } = useDialog();

    useEffect(() => {
        mountDialog({
            id: 'location',
            open: false,
            Component: (props) => <LocationSelectorDialog {...props}/>,
        });
    }, []);

    const handleClick: MouseEventHandler = () => openDialog('location');

    const selected = isDialogOpen('location');

    return (
        <Tooltip title={t('tooltip')}>
            <Box className='justify-self-start'>
                <IconButton
                    borderless
                    size='md'
                    selected={selected}
                    Icon={MapPin}
                    onClick={handleClick}
                />
            </Box>
        </Tooltip>
    );
};

export default LocationButton;
