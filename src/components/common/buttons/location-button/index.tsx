'use client';

import type { FC, MouseEventHandler } from 'react';

import { Variants } from 'motion/react';

import { useGeolocation } from 'shared/hooks';
import { useDialog } from 'shared/contexts/dialog';

import { IconButton } from 'ui/button';
import { Icon, MapPin } from 'components/icons';

type LocationButtonProps = Readonly<object>;

const variants: Variants = {
  pulse: {
    opacity: 1,
    scale: [1, 0.95, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
} as const;

const LocationButton: FC<LocationButtonProps> = () => {
    'use memo'
    const { isWatching } = useGeolocation();

    const {
        openDialog,
        isDialogOpen,
    } = useDialog();

    const handleClick: MouseEventHandler = () => openDialog('location');

    const isLocationDialogOpen = isDialogOpen('location');
    const selected = isWatching || isLocationDialogOpen;

    return (
        <IconButton
            variant='filled'
            color='background'
            initial={{
                opacity: 1,
            }}
            animate={(isWatching && !isLocationDialogOpen) && 'pulse'}
            variants={variants}
            onClick={handleClick}
        >
            <Icon value={MapPin}/>
        </IconButton>
    );
};

export default LocationButton;
