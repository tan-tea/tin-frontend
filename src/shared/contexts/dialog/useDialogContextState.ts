import {
    useState,
    useCallback,
} from 'react';

import type {
    DialogProps,
} from 'shared/contexts/dialog/types';

type DialogContextState = {
    dialogs: Array<DialogProps>;
    openDialog: (id: DialogProps['id']) => void;
    closeDialog: (id: DialogProps['id']) => void;
    getDialog: (id: DialogProps['id']) => DialogProps;
    isDialogOpen: (id: DialogProps['id']) => boolean;
    closeAllDialogs: () => void;
    mountDialog: (dialog: DialogProps) => void;
};

const useDialogContextState: () => DialogContextState = () => {
    const [dialogsState, setDialogsState,] = useState<Array<DialogProps>>([]);

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

    const mountDialog = useCallback(
        (dialog) => {
            const isDialogMounted = dialogsState?.find?.(d => d?.id === dialog.id);
            if (isDialogMounted) return;

            const newState = [
                ...dialogsState,
                dialog,
            ];

            setDialogsState(newState);
        },
        [],
    ) as DialogContextState['mountDialog'];

    return {
        dialogs: dialogsState,
        openDialog,
        closeDialog,
        getDialog,
        isDialogOpen,
        closeAllDialogs,
        mountDialog,
    };
};

export default useDialogContextState;
