'use client'

import type { FC, MouseEventHandler } from 'react';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { useGeolocation } from 'shared/hooks';
import { useDialog } from 'shared/contexts/dialog';

import {
    DialogBackdrop,
    DialogClose,
    DialogDescription,
    DialogPopup,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogViewport,
} from 'ui/dialog';
import { Button } from 'ui/button';

type LocationDialogProps = Readonly<object>;

const LocationDialog: FC<LocationDialogProps> = () => {
    'use memo'
    const t = useTranslations();

    const {
        isDialogOpen,
        closeDialog,
        mountDialog,
    } = useDialog();

    const {
        error,
        isWatching,
        requestGeolocationPermission,
    } = useGeolocation();

    const handleClick: MouseEventHandler = () => {
        if (requestGeolocationPermission)
            requestGeolocationPermission();
    }

    useEffect(() => {
        if (mountDialog) mountDialog({
            id: 'location',
            open: false,
        });
    }, [mountDialog]);

    const isOpen = isDialogOpen('location');
    const isDisabled = isWatching || Boolean(error);
    const notLocationActive = !isWatching && !error;
    const locationActive = isWatching && !error;

    return (
        <DialogRoot
            open={isOpen}
            onOpenChange={(open) => !open && closeDialog('location')}
        >
            <DialogPortal>
                <DialogBackdrop/>
                <DialogViewport>
                    <DialogPopup>
                        <DialogTitle>{t('location.dialog.title')}</DialogTitle>
                        <DialogDescription>
                            {error
                                ? error.message
                                : t('location.dialog.description')
                            }
                        </DialogDescription>
                        <div className='w-full flex flex-col gap-y-3'>
                            <Button
                                disabled={isDisabled}
                                onClick={handleClick}
                            >
                                {notLocationActive && t('location.dialog.button')}
                                {locationActive && t('sharingLocation')}
                            </Button>
                            <DialogClose variant='outline'>
                                {t('shared.close')}
                            </DialogClose>
                        </div>
                    </DialogPopup>
                </DialogViewport>
            </DialogPortal>
        </DialogRoot>
    );
};

export default LocationDialog;
