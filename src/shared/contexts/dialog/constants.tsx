import type {
    DialogProps,
} from 'shared/contexts/dialog/types';

import ThemeSelectorDialog from 'common/Theme/SelectorDialog';
import LanguageSelectorDialog from 'common/Language/SelectorDialog';

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
