'use client';

import type { FC, JSX } from 'react';
import type { SwitcherOpts } from './switcher';

import dynamic from 'next/dynamic';

import { useShallow } from 'zustand/shallow';

import { locales } from 'lib/i18n/constants';

import { useApplicationStore } from 'shared/stores/application-store';

import {
    En,
    Es,
} from 'components/icons';


const Switcher = dynamic(
    () => import('./switcher'),
    {
        ssr: false,
    },
);

type Locale = typeof locales[number];

const iconMap: Record<Locale, JSX.Element> = {
    'en': <En/>,
    'es': <Es/>,
} as const;

const options: Array<SwitcherOpts> = locales.map(locale => ({
    icon: iconMap[locale],
    value: locale,
}));

const LanguageSwitcher: FC = () => {
    'use memo'
    const {
        language,
        setLanguage,
    } = useApplicationStore(
        useShallow(store => store),
    );

    if (options?.length <= 1) return null;

    return (
        <Switcher
            layoutId='language'
            current={language}
            setCurrent={setLanguage}
            options={options}
        />
    );
}

export default LanguageSwitcher;
