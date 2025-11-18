'use client';

import type {
    FC,
    JSX,
} from 'react';
import { useShallow } from 'zustand/shallow';

import { useApplicationStore } from 'shared/stores/application-store';
import { ApplicationLanguage, } from 'shared/stores/application-store/types';

import {
    En,
    Es,
} from 'icons/index';

import Switcher, {
    type SwitcherOption
} from './Switcher';

const LanguageSwitcher: FC = () => {
    'use memo'
    const {
        language,
        setLanguage,
    } = useApplicationStore(
        useShallow(store => store),
    );

    const options: Array<SwitcherOption<ApplicationLanguage>> = [
        {
            icon: <En/>,
            value: 'en',
        },
        {
            icon: <Es/>,
            value: 'es',
        },
    ];

    return (
        <Switcher
            current={language}
            setCurrent={setLanguage}
            options={options}
        />
    );
}

export default LanguageSwitcher;
