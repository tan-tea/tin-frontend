'use client';

import {
    FC,
    useEffect,
} from 'react';
import { useShallow, } from 'zustand/react/shallow';

import { useApplicationStore, } from 'shared/stores/application-store';

type ThemeWatcherProps = object;

const ThemeWatcher: FC<ThemeWatcherProps> = (
    props: ThemeWatcherProps,
) => {
    const {} = props;

    const {
        theme,
    } = useApplicationStore(
        useShallow(store => store),
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldUseDark = theme === 'dark' || (!localStorage.getItem('application-storage') && prefersDark);

        document.body.classList.toggle('dark', shouldUseDark);
    }, [theme]);

    return null;
};

export default ThemeWatcher;
