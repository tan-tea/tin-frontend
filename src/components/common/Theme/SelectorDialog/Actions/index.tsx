'use client'

import type { FC, } from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Button,
} from 'ui/index';

type ThemeSelectorDialogActionsProps = {
    t: ReturnType<typeof useTranslations>;
    onSave: () => void;
    onCancel: () => void;
};

const ThemeSelectorDialogActions: FC<ThemeSelectorDialogActionsProps> = (
    props: ThemeSelectorDialogActionsProps,
) => {
    const {
        t,
        onCancel,
    } = props;

    return (
        <Box className='w-full flex flex-col-reverse gap-y-2 md:w-auto md:flex-row md:gap-x-4'>
            <Button
                size='large'
                color='primary'
                variant='outlined'
                onClick={() => onCancel && onCancel()}
            >
                {t('shared.close')}
            </Button>
        </Box>
    );
};

export default ThemeSelectorDialogActions;
