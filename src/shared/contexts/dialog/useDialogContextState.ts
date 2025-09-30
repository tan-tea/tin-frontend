'use client'

import {
    useState,
    useCallback,
} from 'react';

import type {
    DialogProps,
} from 'shared/contexts/dialog/types';
import { DEFAULT_DIALOGS_STATE, } from 'shared/contexts/dialog/constants'

type DialogContextState = {
    dialogs: Array<DialogProps>;
    openDialog: (id: DialogProps['id']) => void;
    closeDialog: (id: DialogProps['id']) => void;
    getDialog: (id: DialogProps['id']) => DialogProps;
    isDialogOpen: (id: DialogProps['id']) => boolean;
    closeAllDialogs: () => void;
};

const useDialogContextState: () => DialogContextState = () => {
    const [dialogsState, setDialogsState,] = useState<Array<DialogProps>>(DEFAULT_DIALOGS_STATE);

    const isDialogOpen = useCallback(
        (id: DialogProps['id']) => {
            const currentDialog = dialogsState?.find?.(d => d?.id === id);
            return currentDialog?.open;
        },
        [dialogsState,],
    ) as DialogContextState['isDialogOpen'];

    const closeDialog = useCallback(
        (id: DialogProps['id']) => {
            setDialogsState(
                (state) => state?.map?.(
                    (dialog) => dialog?.id === id
                        ? { ...dialog, open: false, }
                        : dialog
                ),
            );
        },
        [],
    ) as DialogContextState['closeDialog'];

    const openDialog = useCallback(
        (id: DialogProps['id']) => {
            if (isDialogOpen(id)) closeDialog(id);

            setDialogsState(
                (state) => state?.map?.(
                    (dialog) => dialog?.id === id
                        ? { ...dialog, open: true, }
                        : dialog
                ),
            );
        },
        [],
    ) as DialogContextState['openDialog'];

    const getDialog = useCallback(
        (id: DialogProps['id']) => {
            const currentDialog = dialogsState?.find?.(d => d?.id === id);
            return currentDialog;
        },
        [],
    ) as DialogContextState['getDialog'];

    const closeAllDialogs = useCallback(
        () => {
            const newState = dialogsState?.map?.(dialog => ({
                ...dialog,
                open: false,
            }));
            setDialogsState(newState);
        },
        [],
    ) as DialogContextState['closeAllDialogs'];

    return {
        dialogs: dialogsState,
        openDialog,
        closeDialog,
        getDialog,
        isDialogOpen,
        closeAllDialogs,
    };
};

export default useDialogContextState;
