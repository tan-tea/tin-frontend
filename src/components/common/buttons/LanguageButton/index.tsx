'use client';

import type {
    FC,
    MouseEventHandler,
} from 'react';
import { useTranslations, } from 'next-intl';

import { useDialog } from 'shared/contexts/dialog';

import {
    Box,
    Tooltip,
    IconButton,
} from 'ui/index';
import { Languages } from 'icons/index';

type LanguageButtonProps = object;

const LanguageButton: FC<LanguageButtonProps> = () => {
    'use memo'
    const t = useTranslations();

    const {
        openDialog,
        isDialogOpen,
    } = useDialog();

    const handleClick: MouseEventHandler = () => openDialog('language');

    const selected = isDialogOpen('language');

    return (
        <Tooltip title={t('language.tooltip')}>
            <Box className='justify-self-center'>
                <IconButton
                    borderless
                    size='md'
                    selected={selected}
                    icon={Languages}
                    onClick={handleClick}
                />
            </Box>
        </Tooltip>
    );
};

export default LanguageButton;
