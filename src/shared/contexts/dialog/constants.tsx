import type {
    DialogProps,
} from 'shared/contexts/dialog/types';

import ThemeSelectorDialog from 'common/Theme/SelectorDialog';

const DEFAULT_DIALOGS_STATE: Array<DialogProps> = [
    {
        id: 'theme-dialog',
        open: false,
        Component: (props: DialogProps) => <ThemeSelectorDialog {...props}/>,
    },
];

export {
    DEFAULT_DIALOGS_STATE,
};
