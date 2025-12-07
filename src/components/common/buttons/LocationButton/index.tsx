'use client';

import type {
    FC,
    MouseEventHandler,
} from 'react';
import { useEffect, useRef } from 'react';
import { useTranslations, } from 'next-intl';
import { motion, Variants } from 'motion/react';

import { useGeolocation } from 'shared/hooks';
import { useDialog } from 'shared/contexts/dialog';

import {
    Tooltip,
    IconButton,
} from 'ui/index';
import { MapPin } from 'icons/index';

import LocationSelectorDialog from 'common/dialogs/LocationSelectorDialog';

type LocationButtonProps = object;

const variants: Variants = {
  pulse: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const LocationButton: FC<LocationButtonProps> = () => {
    'use memo'
    const locationButtonRef = useRef<HTMLButtonElement | null>(null);

    const t = useTranslations('language');

    const { isWatching } = useGeolocation();

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

    const isLocationDialogOpen = isDialogOpen('location');
    const selected = isWatching || isLocationDialogOpen;

    return (
        <Tooltip title={t('tooltip')}>
            <motion.div
                animate={isWatching && !isLocationDialogOpen ? 'pulse' : ''}
                variants={variants}
                className='justify-self-start'
            >
                <IconButton
                    ref={locationButtonRef}
                    borderless
                    size='md'
                    selected={selected}
                    icon={MapPin}
                    onClick={handleClick}
                />
            </motion.div>
        </Tooltip>
    );
};

export default LocationButton;
