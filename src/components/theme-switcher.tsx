'use client';

import type { FC } from 'react';

import { useShallow } from 'zustand/shallow';

import { useApplicationStore } from 'shared/stores/application-store';

import {
    MonitorIcon,
    MoonStarIcon,
    SunIcon,
} from 'components/icons';

import Switcher, {
    type SwitcherOption
} from './switcher';

const options: Array<SwitcherOption> = [
    {
        icon: <MonitorIcon/>,
        value: 'system',
    },
    {
        icon: <SunIcon/>,
        value: 'light',
    },
    {
        icon: <MoonStarIcon/>,
        value: 'dark',
    },
];

const ThemeSwitcher: FC = () => {
    'use memo'
    const {
        theme,
        setTheme
    } = useApplicationStore(
        useShallow(store => store),
    );

    return (
        <Switcher
            current={theme}
            setCurrent={setTheme}
            options={options}
        />
    );
}

export default ThemeSwitcher;
