'use client'

import {
    FC,
    useMemo,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    Box,
    Text,
} from 'ui/index';
import {
    Sun,
    Moon,
    Monitor,
} from 'icons/index';

import { ApplicationTheme, } from 'shared/stores/application-store/types';

import ThemeOptionCard, {
    ThemeOption,
} from 'common/Theme/OptionCard';

type ThemeSelectorDialogContentProps = {
    currentTheme: ApplicationTheme;
    onSelectTheme: (theme: ApplicationTheme) => void;
};

const ThemeSelectorDialogContent: FC<ThemeSelectorDialogContentProps> = (
    props: ThemeSelectorDialogContentProps,
) => {
    const {
        currentTheme,
        onSelectTheme,
    } = props;

    const t = useTranslations('theme.dialog');

    const handleSelectOption = (
        value: ApplicationTheme
    ) => onSelectTheme && onSelectTheme(value);

    const themeOptions: Array<ThemeOption> = useMemo(
        () => [
            {
                icon: <Monitor/>,
                title: t('system.title'),
                image: '/vercel.svg',
                label: t('system.label'),
                value: 'system',
                isActive: currentTheme === 'system',
                description: t('system.description'),
                onSelectOption: handleSelectOption,
            },
            {
                icon: <Sun/>,
                title: t('light.title'),
                image: '/vercel.svg',
                label: t('light.label'),
                value: 'light',
                isActive: currentTheme === 'light',
                description: t('light.description'),
                onSelectOption: handleSelectOption,
            },
            {
                icon: <Moon/>,
                title: t('dark.title'),
                image: '/vercel.svg',
                label: t('dark.label'),
                value: 'dark',
                isActive: currentTheme === 'dark',
                description: t('dark.description'),
                onSelectOption: handleSelectOption,
            },
        ] as Array<ThemeOption>,
        [t, currentTheme,],
    );

    return (
        <Box className='size-full flex flex-col gap-y-6'>
            <Text
                variant='body2'
                component='p'
                className='text-sm text-gray-800'
            >
                {t('description')}
            </Text>
            <Box className='flex items-center justify-center gap-x-6'>
                {themeOptions && themeOptions?.map?.(
                    (option) => <ThemeOptionCard key={option?.label} {...option}/>
                )}
            </Box>
        </Box>
    );
};

export default ThemeSelectorDialogContent;
