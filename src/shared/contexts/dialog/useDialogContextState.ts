import {
    useState,
    useCallback,
} from 'react';

type Dialog = {
    id: string;
    open: boolean;
};

type DialogContextState = {
    dialogs: Array<Dialog>;
    closeAllDialogs: () => void;
    openDialog: (id: Dialog['id']) => void;
    closeDialog: (id: Dialog['id']) => void;
    isDialogOpen: (id: Dialog['id']) => boolean;
    mountDialog: (dialog: Dialog) => void;
};

const useDialogContextState: () => DialogContextState = () => {
    const [dialogs, setDialogs,] = useState<DialogContextState['dialogs']>([]);

    const isDialogOpen: DialogContextState['isDialogOpen'] = useCallback(
        (id) => {
            const currentDialog = dialogs?.find?.(d => d?.id === id);
            return currentDialog?.open ?? false;
        },
        [dialogs,],
    );

    const closeDialog: DialogContextState['closeDialog'] = useCallback(
        (id) => {
            setDialogs(
                (state) => state?.map?.(
                    (dialog) => dialog?.id === id
                        ? { ...dialog, open: false, }
                        : dialog
                ),
            );
        },
        [],
    );

    const openDialog: DialogContextState['openDialog'] = useCallback(
        (id) => {
            const isOpen = isDialogOpen(id);
            if (isOpen) return;

            setDialogs(
                (state) => state?.map?.(
                    (dialog) => dialog?.id === id
                        ? { ...dialog, open: true, }
                        : dialog
                ),
            );
        },
        [],
    );

    const closeAllDialogs: DialogContextState['closeAllDialogs'] = useCallback(
        () => {
            const newState = dialogs?.map?.(dialog => ({
                ...dialog,
                open: false,
            }));
            setDialogs(newState);
        },
        [],
    );

    const mountDialog: DialogContextState['mountDialog'] = useCallback(
        (dialog) => {
            const isDialogMounted = dialogs?.find?.(d => d?.id === dialog.id);
            if (isDialogMounted) return;

            const newState = [
                ...dialogs,
                dialog,
            ];

            setDialogs(newState);
        },
        [],
    );

    return {
        dialogs: dialogs,
        openDialog,
        closeDialog,
        isDialogOpen,
        closeAllDialogs,
        mountDialog,
    };
};

export default useDialogContextState;
