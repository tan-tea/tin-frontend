'use client'

import contextFactory from 'shared/contexts/contextFactory';
import useDialogContextState from 'shared/contexts/dialog/useDialogContextState';

import DialogManager from 'common/DialogManager';

const {
    Provider,
    useContext,
} = contextFactory(useDialogContextState, undefined, <DialogManager/>);

export {
    Provider as DialogProvider,
    useContext as useDialog,
};
