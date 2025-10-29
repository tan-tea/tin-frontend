import {
    useMemo,
    useEffect,
} from 'react';
import { useShallow } from 'zustand/shallow';
import { createTheme, Theme} from '@mui/material';

import DEFAULT_THEME from 'app/theme';

import { useThemeData } from 'shared/hooks/queries';
import { useApplicationStore } from 'shared/stores/application-store';

type DynamicThemeContextState = {
    theme: Theme;
    isLoadingTheme: boolean;
};

type UseDynamicThemeHandler = () => DynamicThemeContextState;

const useDynamicThemeContextState: UseDynamicThemeHandler = () => {
    const defaultTheme = useMemo(
        () => createTheme(DEFAULT_THEME),
        [],
    );

    const {
        setLoading,
    } = useApplicationStore(
        useShallow(store => store)
    );

    const {
        data: themeData,
        isLoading: themeLoading,
    } = useThemeData();

    const theme = createTheme({
        ...defaultTheme,
        cssVariables: true,
        palette: {
            ...defaultTheme?.palette,
            ...(themeData && {
                ...themeData,
            }),
        },
    });

    useEffect(() => {
        setLoading(themeLoading);
    }, [themeLoading,]);

    return {
        theme,
        isLoadingTheme: themeLoading,
    };
}

export default useDynamicThemeContextState;
