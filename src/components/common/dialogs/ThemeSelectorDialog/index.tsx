'use client'

import type { FC, } from 'react';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import { useDialog, } from 'shared/contexts/dialog';
import { DialogProps, } from 'shared/contexts/dialog/types';
import { useApplicationStore, } from 'shared/stores/application-store';

import SelectorDialog from 'common/dialogs/SelectorDialog';
import SelectorDialogActions from 'common/dialogs/SelectorDialog/Actions';
import ThemeSelectorDialogContent from 'common/dialogs/ThemeSelectorDialog/Content';

type ThemeSelectorDialogProps = Pick<DialogProps, 'open'>;

const ThemeSelectorDialog: FC<ThemeSelectorDialogProps> = (props) => {
    'use memo'
    const {
        open,
    } = props;

    const t = useTranslations();

    const { closeDialog, } = useDialog();

    const {
        theme,
        setTheme,
    } = useApplicationStore(
        useShallow(store => store),
    );

    return (
        <SelectorDialog
            open={open}
            onClose={() => closeDialog('theme')}
            title={t('theme.dialog.title')}
            content={<ThemeSelectorDialogContent
                t={t}
                currentTheme={theme}
                onSelectTheme={setTheme}
            />}
            actions={<SelectorDialogActions
                t={t}
                onCancel={() => closeDialog('theme')}
            />}
        />
    );
};

export default ThemeSelectorDialog;
