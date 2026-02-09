'use client';

import type { FC } from 'react';
import type { SwitcherOpts } from './switcher';

import dynamic from 'next/dynamic';

import { useShallow } from 'zustand/shallow';

import { useApplicationStore } from 'shared/stores/application-store';

import {
    MonitorIcon,
    MoonStarIcon,
    SunIcon,
} from 'components/icons';

const Switcher = dynamic(
    () => import('./switcher'),
    {
        ssr: false,
    },
);

const options: Array<SwitcherOpts> = [
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
            layoutId='theme'
            current={theme}
            setCurrent={setTheme}
            options={options}
        />
    );
}

export default ThemeSwitcher;
