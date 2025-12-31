import contextFactory from 'shared/contexts/contextFactory';
import useDialogContextState from 'shared/contexts/dialog/useDialogContextState';

const {
    Provider,
    useContext,
} = contextFactory(useDialogContextState);

export {
    Provider as DialogProvider,
    useContext as useDialog,
};
