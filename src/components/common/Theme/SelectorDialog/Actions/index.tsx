'use client'

import {
    FC,
    Fragment,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Button,
} from 'ui/index';

type ThemeSelectorDialogActionsProps = {
    onSave: () => void;
    onCancel: () => void;
};

const ThemeSelectorDialogActions: FC<ThemeSelectorDialogActionsProps> = (
    props: ThemeSelectorDialogActionsProps,
) => {
    const {
        onSave,
        onCancel,
    } = props;

    const t = useTranslations('shared');

    return (
        <Fragment>
            <Button
                color='primary'
                variant='outlined'
                onClick={() => onCancel && onCancel()}
            >
                {t('cancel')}
            </Button>
            <Button
                color='primary'
                variant='contained'
                onClick={() => onSave && onSave()}
            >
                {t('saveChanges')}
            </Button>
        </Fragment>
    );
};

export default ThemeSelectorDialogActions;
