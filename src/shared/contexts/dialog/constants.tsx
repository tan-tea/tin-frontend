import type {
    DialogProps,
} from 'shared/contexts/dialog/types';

import ThemeSelectorDialog from 'common/dialogs/ThemeSelectorDialog';
import LanguageSelectorDialog from 'common/dialogs/LanguageSelectorDialog';

const DEFAULT_DIALOGS_STATE: Array<DialogProps> = [
    {
        id: 'theme',
        open: false,
        Component: (props: DialogProps) => <ThemeSelectorDialog {...props}/>,
    },
    {
        id: 'language',
        open: false,
        Component: (props: DialogProps) => <LanguageSelectorDialog {...props}/>,
    },
];

export {
    DEFAULT_DIALOGS_STATE,
};
