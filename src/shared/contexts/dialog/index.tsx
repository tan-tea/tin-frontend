import dynamic from 'next/dynamic';

import contextFactory from 'shared/contexts/contextFactory';
import useDialogContextState from 'shared/contexts/dialog/useDialogContextState';

const DialogManager = dynamic(
    () => import('common/dialogs/DialogManager'),
    {
        ssr: false,
    },
);

const {
    Provider,
    useContext,
} = contextFactory(useDialogContextState, undefined, <DialogManager/>);

export {
    Provider as DialogProvider,
    useContext as useDialog,
};
