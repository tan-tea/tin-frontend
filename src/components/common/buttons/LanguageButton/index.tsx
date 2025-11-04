'use client';

import type {
    FC,
    MouseEventHandler,
} from 'react';
import { useTranslations, } from 'next-intl';
import { useShallow } from 'zustand/shallow';

import {
    Box,
    Tooltip,
    IconButton,
} from 'ui/index';
import { Languages } from 'icons/index';

import { useDialog } from 'shared/contexts/dialog';
import { useApplicationStore } from 'shared/stores/application-store';

type LanguageButtonProps = object;

const LanguageButton: FC<LanguageButtonProps> = (
    props: LanguageButtonProps,
) => {
    const {} = props;

    const t = useTranslations();

    const {
        openDialog,
        isDialogOpen,
    } = useDialog();

    const {
        language,
    } = useApplicationStore(
        useShallow(store => store),
    );

    const handleClick: MouseEventHandler = () => openDialog('language');

    const selected = isDialogOpen('language');

    return (
        <Tooltip title={t('language.tooltip')}>
            <Box className='justify-self-center'>
                <IconButton
                    borderless
                    selected={selected}
                    Icon={Languages}
                    onClick={handleClick}
                />
            </Box>
        </Tooltip>
    );
};

export default LanguageButton;
