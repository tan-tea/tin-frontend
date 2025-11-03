import {
    useMemo,
    useEffect,
} from 'react';
import { useShallow } from 'zustand/shallow';
import { createTheme, Theme} from '@mui/material';

import DEFAULT_THEME from 'app/theme';

import { formatThemePalette } from 'lib/utils';

import { useCustomizationData } from 'shared/hooks/queries';
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
        data: customizationData,
        isLoading: customizationLoading,
    } = useCustomizationData();

    const theme = useMemo<Theme>(
        () => {
            if (!customizationData)
                return defaultTheme;

            const formatted = formatThemePalette(customizationData!);

            return createTheme({
                ...defaultTheme,
                cssVariables: true,
                palette: {
                    ...defaultTheme.palette,
                    ...(formatted && formatted),
                },
            });
        },
        [customizationData,],
    ) ;

    useEffect(() => {
        setLoading(customizationLoading);
    }, [customizationLoading,]);

    return {
        theme,
        isLoadingTheme: customizationLoading,
    };
}

export default useDynamicThemeContextState;
