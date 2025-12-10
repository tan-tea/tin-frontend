'use client'

import type {
    FC,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Typography,
} from 'ui/index';
import {
    Sun,
    Moon,
    Monitor,
} from 'icons/index';

import { ApplicationTheme, } from 'shared/stores/application-store/types';

import ThemeOptionCard, {
    ThemeOption,
} from 'common/ThemeOptionCard';

type ThemeSelectorDialogContentProps = {
    t: ReturnType<typeof useTranslations>;
    currentTheme: ApplicationTheme;
    onSelectTheme: (theme: ApplicationTheme) => void;
};

const ThemeSelectorDialogContent: FC<ThemeSelectorDialogContentProps> = (
    props: ThemeSelectorDialogContentProps,
) => {
    'use memo'
    const {
        t,
        currentTheme,
        onSelectTheme,
    } = props;

    const handleSelectOption = (
        value: ApplicationTheme
    ) => onSelectTheme && onSelectTheme(value);

    const themeOptions: Array<ThemeOption> = [
        {
            icon: <Monitor/>,
            title: t('theme.dialog.system.title'),
            image: '/images/vercel.svg',
            label: t('theme.dialog.system.label'),
            value: 'system',
            selected: currentTheme === 'system',
            description: t('theme.dialog.system.description'),
            onSelectOption: handleSelectOption,
        },
        {
            icon: <Sun/>,
            title: t('theme.dialog.light.title'),
            image: '/images/vercel.svg',
            label: t('theme.dialog.light.label'),
            value: 'light',
            selected: currentTheme === 'light',
            description: t('theme.dialog.light.description'),
            onSelectOption: handleSelectOption,
        },
        {
            icon: <Moon/>,
            title: t('theme.dialog.dark.title'),
            image: '/images/vercel.svg',
            label: t('theme.dialog.dark.label'),
            value: 'dark',
            selected: currentTheme === 'dark',
            description: t('theme.dialog.dark.description'),
            onSelectOption: handleSelectOption,
        },
    ];

    return (
        <Box className='size-full flex flex-col gap-y-6'>
            <Typography
                variant='body2'
                component='p'
                className='hidden text-xs text-center md:block md:text-left md:text-sm text-gray-800'
            >
                {t('theme.dialog.description')}
            </Typography>
            <Box className='w-full flex flex-col md:flex-row gap-x-6 gap-y-4 flex-wrap overflow-hidden'>
                {themeOptions && themeOptions?.map?.(
                    (option) => <ThemeOptionCard key={option?.label} {...option}/>
                )}
            </Box>
        </Box>
    );
};

export default ThemeSelectorDialogContent;
