'use client'

import type { FC, } from 'react';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import { useDialog, } from 'shared/contexts/dialog';
import { DialogProps, } from 'shared/contexts/dialog/types';
import { useApplicationStore, } from 'shared/stores/application-store';

import SelectorDialog from 'common/SelectorDialog';
import SelectorDialogActions from 'common/SelectorDialog/Actions';
import ThemeSelectorDialogContent from 'common/Theme/SelectorDialog/Content';

type ThemeSelectorDialogProps = Pick<DialogProps, 'open'>;

const ThemeSelectorDialog: FC<ThemeSelectorDialogProps> = (
    props: ThemeSelectorDialogProps,
) => {
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
