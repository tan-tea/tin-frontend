'use client'

import type { FC, } from 'react';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import { useDialog, } from 'shared/contexts/dialog';
import { DialogProps, } from 'shared/contexts/dialog/types';
import { useApplicationStore, } from 'shared/stores/application-store';

import SelectorDialog from 'common/SelectorDialog';
import LanguageSelectorDialogContent from 'common/Language/SelectorDialog/Content';
import SelectorDialogActions from 'common/SelectorDialog/Actions';

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
        language,
        setLanguage,
    } = useApplicationStore(
        useShallow(store => store),
    );

    const handleCloseDialog = () => closeDialog('language');

    return (
        <SelectorDialog
            open={open}
            onClose={handleCloseDialog}
            title={t('language.dialog.title')}
            content={<LanguageSelectorDialogContent
                t={t}
                currentLanguage={language}
                onSelectLanguage={setLanguage}
            />}
            actions={<SelectorDialogActions
                t={t}
                onCancel={handleCloseDialog}
            />}
        />
    );
};

export default LanguageSelectorDialog;
