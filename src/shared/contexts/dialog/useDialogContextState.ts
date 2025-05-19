'use client'

import {
    useRef,
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
};

const useDialogContextState: () => DialogContextState = () => {
    const dialogsRef = useRef<any[]>([]);

    const [dialogsState = [], setDialogsState,] = useState<Array<DialogProps>>(DEFAULT_DIALOGS_STATE);

    const openDialog = useCallback(
        (id: DialogProps['id']) => {
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

    const getDialog = useCallback(
        (id: DialogProps['id']) => {
            const currentDialog = dialogsState?.find?.(d => d?.id === id);
            return currentDialog;
        },
        [],
    ) as DialogContextState['getDialog'];

    const isDialogOpen = useCallback(
        (id: DialogProps['id']) => {
            const currentDialog = dialogsState?.find?.(d => d?.id === id);
            return currentDialog?.open;
        },
        [],
    ) as DialogContextState['isDialogOpen'];

    return {
        dialogs: dialogsState,
        openDialog,
        closeDialog,
        getDialog,
        isDialogOpen,
    };
};

export default useDialogContextState;
