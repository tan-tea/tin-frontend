'use client'

import type {
    FC
} from 'react';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import { useGeolocation } from 'shared/hooks';
import { useDialog, } from 'shared/contexts/dialog';
import { DialogProps, } from 'shared/contexts/dialog/types';
import { useApplicationStore, } from 'shared/stores/application-store';

import Button from 'ui/button';

import SelectorDialog from 'common/dialogs/SelectorDialog';
import SelectorDialogActions from 'common/dialogs/SelectorDialog/Actions';

import LocationSelectorDialogContent from './Content';

type LocationSelectorDialogProps = Pick<DialogProps, 'open'>;

const LocationSelectorDialog: FC<LocationSelectorDialogProps> = ({
    open,
}) => {
    'use memo'
    const t = useTranslations();

    const { closeDialog, } = useDialog();
    const {
        isWatching,
        geolocationError,
        requestGeolocationPermission,
    } = useGeolocation();

    const {
        geolocation,
        setGeolocation,
    } = useApplicationStore(
        useShallow(store => store),
    );

    return (
        <SelectorDialog
            open={open}
            onClose={() => closeDialog('location')}
            title={t('location.dialog.title')}
            content={<LocationSelectorDialogContent
                t={t}
                currentLocation={geolocation}
                onSelectLocation={setGeolocation}
            />}
            actions={<SelectorDialogActions
                t={t}
                renderAction={() => (
                    <>
                        <Button
                            block
                            mobile
                            disabled={isWatching}
                            rounded='full'
                            variant='contained'
                            color='primary'
                            onClick={() => requestGeolocationPermission()}
                        >
                            {!isWatching && !geolocationError
                                ? t('location.dialog.button')
                                : !isWatching && geolocationError
                                    ? geolocationError.message
                                    : t('sharingLocation')
                            }
                        </Button>
                    </>
                )}
                onCancel={() => closeDialog('location')}
            />}
        />
    );
};

export default LocationSelectorDialog;
