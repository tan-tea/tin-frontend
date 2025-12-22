'use client'

import type {
    FC,
    MouseEventHandler,
} from 'react';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/shallow';

import {
    Box,
    Tooltip,
    IconButton,
} from 'ui/index';
import { Moon, SunMoon, } from 'components/icons';

import { useDialog, } from 'shared/contexts/dialog';
import { useApplicationStore } from 'shared/stores/application-store';

type ThemeButtonProps = object;

const ThemeButton: FC<ThemeButtonProps> = () => {
    'use memo'
    const t = useTranslations();

    const {
        openDialog,
        isDialogOpen,
    } = useDialog();

    const {
        theme,
    } = useApplicationStore(
        useShallow(store => store)
    );

    const handleClick: MouseEventHandler = () => openDialog('theme');

    const selected = isDialogOpen('theme');

    return (
        <Tooltip title={t('theme.tooltip')}>
            <Box className='justify-self-center'>
                <IconButton
                    borderless
                    size='md'
                    selected={selected}
                    icon={theme === 'dark' ? SunMoon : Moon}
                    onClick={handleClick}
                />
            </Box>
        </Tooltip>
    );
};

export default ThemeButton;
