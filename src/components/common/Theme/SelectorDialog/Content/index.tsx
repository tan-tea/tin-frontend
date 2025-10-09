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
    t: ReturnType<typeof useTranslations>;
    currentTheme: ApplicationTheme;
    onSelectTheme: (theme: ApplicationTheme) => void;
};

const ThemeSelectorDialogContent: FC<ThemeSelectorDialogContentProps> = (
    props: ThemeSelectorDialogContentProps,
) => {
    const {
        t,
        currentTheme,
        onSelectTheme,
    } = props;

    const handleSelectOption = (
        value: ApplicationTheme
    ) => onSelectTheme && onSelectTheme(value);

    const themeOptions: Array<ThemeOption> = useMemo(
        () => [
            {
                icon: <Monitor/>,
                title: t('theme.dialog.system.title'),
                image: '/vercel.svg',
                label: t('theme.dialog.system.label'),
                value: 'system',
                selected: currentTheme === 'system',
                description: t('theme.dialog.system.description'),
                onSelectOption: handleSelectOption,
            },
            {
                icon: <Sun/>,
                title: t('theme.dialog.light.title'),
                image: '/vercel.svg',
                label: t('theme.dialog.light.label'),
                value: 'light',
                selected: currentTheme === 'light',
                description: t('theme.dialog.light.description'),
                onSelectOption: handleSelectOption,
            },
            {
                icon: <Moon/>,
                title: t('theme.dialog.dark.title'),
                image: '/vercel.svg',
                label: t('theme.dialog.dark.label'),
                value: 'dark',
                selected: currentTheme === 'dark',
                description: t('theme.dialog.dark.description'),
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
                className='hidden text-xs text-center md:block md:text-left md:text-sm text-gray-800'
            >
                {t('theme.dialog.description')}
            </Text>
            <Box className='w-full flex flex-col md:flex-row gap-x-6 gap-y-4 flex-wrap overflow-hidden'>
                {themeOptions && themeOptions?.map?.(
                    (option) => <ThemeOptionCard key={option?.label} {...option}/>
                )}
            </Box>
        </Box>
    );
};

export default ThemeSelectorDialogContent;
