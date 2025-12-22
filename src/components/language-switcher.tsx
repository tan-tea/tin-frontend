'use client';

import type { FC, JSX } from 'react';

import { useShallow } from 'zustand/shallow';

import { useApplicationStore } from 'shared/stores/application-store';

import {
    En,
    Es,
} from 'components/icons';

import Switcher, {
    type SwitcherOption
} from './switcher';
import { locales } from 'lib/i18n/constants';

type Locale = typeof locales[number];

const iconMap: Record<Locale, JSX.Element> = {
    'en': <En/>,
    'es': <Es/>,
} as const;

const options: Array<SwitcherOption> = locales.map(locale => ({
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
            current={language}
            setCurrent={setLanguage}
            options={options}
        />
    );
}

export default LanguageSwitcher;
