'use client';

import {
    useEffect,
    type FC,
} from 'react';
import { useShallow, } from 'zustand/react/shallow';

import { useLocalStorage } from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';
import { ApplicationState, } from 'shared/stores/application-store/types';
import { defaultInitState } from 'shared/stores/application-store/constants';

type ThemeWatcherProps = object;

const ThemeWatcher: FC<ThemeWatcherProps> = (
    props: ThemeWatcherProps,
) => {
    const {} = props;

    const [ storedValue ] = useLocalStorage<{ state: ApplicationState }>(
        'application-storage',
        {
            state: defaultInitState
        }
    );

    const {
        theme,
    } = useApplicationStore(
        useShallow(store => store),
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldUseDark = theme === 'dark' || ((!storedValue.state.theme || storedValue.state.theme !== 'light') && prefersDark);

        document.body.classList.toggle('dark', shouldUseDark);
    }, [theme]);

    return null;
};

export default ThemeWatcher;
