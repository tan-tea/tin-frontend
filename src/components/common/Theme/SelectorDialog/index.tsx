'use client'

import { FC, } from 'react';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import {
    Dialog,
} from 'ui/index';

import { useDialog, } from 'shared/contexts/dialog';
import { DialogProps, } from 'shared/contexts/dialog/types';
import { useApplicationStore, } from 'shared/stores/application-store';

import ThemeSelectorDialogContent from 'common/Theme/SelectorDialog/Content';
import ThemeSelectorDialogActions from 'common/Theme/SelectorDialog/Actions';

type ThemeSelectorDialogProps = Omit<DialogProps, 'Component'>;

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

    // TODO: UNDO WHEN CANCEL ON THEME SELECTION.
    const handleSave = () => {
        closeDialog('theme-dialog');
    };

    return (
        <Dialog
            maxWidth='md'
            onClose={() => closeDialog('theme-dialog')}
            open={open || false}
            title={t('theme.dialog.title')}
            content={<ThemeSelectorDialogContent
                currentTheme={theme}
                onSelectTheme={setTheme}
            />}
            actions={<ThemeSelectorDialogActions
                onSave={handleSave}
                onCancel={() => closeDialog('theme-dialog')}
            />}
        />
    );
};

export default ThemeSelectorDialog;
