'use client';

import {
    useEffect,
    type FC,
} from 'react';
import { useShallow, } from 'zustand/react/shallow';

import { useApplicationStore, } from 'shared/stores/application-store';

type ThemeWatcherProps = object;

const ThemeWatcher: FC<ThemeWatcherProps> = (
    props: ThemeWatcherProps,
) => {
    'use memo'
    const {} = props;

    const {
        theme,
    } = useApplicationStore(
        useShallow(store => store),
    );

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldUseDark = theme === 'dark' || (theme === 'system' && prefersDark)
            ? true
            : false;

        document.body.classList.toggle('dark', shouldUseDark);
    }, [theme]);

    return null;
};

export default ThemeWatcher;
