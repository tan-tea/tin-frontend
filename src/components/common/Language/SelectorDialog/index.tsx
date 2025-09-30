'use client'

import type { FC, } from 'react';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import {
    Dialog,
} from 'ui/index';

import { useDialog, } from 'shared/contexts/dialog';
import { DialogProps, } from 'shared/contexts/dialog/types';
import { useApplicationStore, } from 'shared/stores/application-store';

// import LanguageSelectorDialogContent from 'common/Language/SelectorDialog/Content';
// import LanguageSelectorDialogActions from 'common/Language/SelectorDialog/Actions';

type LanguageSelectorDialogProps = Omit<DialogProps, 'Component'>;

const LanguageSelectorDialog: FC<LanguageSelectorDialogProps> = (
    props: LanguageSelectorDialogProps,
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

    const handleCloseDialog = () => closeDialog('language');

    const handleSave = () => {
        closeDialog('theme');
    };

    return (
        <Dialog
            maxWidth='md'
            className='min-w-sm'
            onClose={handleCloseDialog}
            open={open || false}
            title={t('language.dialog.title')}
            // content={<LanguageSelectorDialogContent
            //     currentTheme={theme}
            //     onSelectTheme={setTheme}
            // />}
            // actions={<LanguageSelectorDialogActions
            //     t={t}
            //     onSave={handleSave}
            //     onCancel={() => closeDialog('theme')}
            // />}
        />
    );
};

export default LanguageSelectorDialog;
