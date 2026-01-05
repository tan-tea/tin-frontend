import { useMemo } from 'react';
import { createTheme, Theme} from '@mui/material';

import DEFAULT_THEME from 'app/theme';

import { clientEnv } from 'env/client';
import { formatThemePalette } from 'lib/utils';

import { useCustomizationData } from 'layouts/theme/hooks';

type DynamicThemeContextState = Theme;

type UseDynamicThemeHandler = () => DynamicThemeContextState;

const useDynamicThemeContextState: UseDynamicThemeHandler = () => {
    'use memo'
    const defaultTheme = useMemo(
        () => createTheme(DEFAULT_THEME),
        [DEFAULT_THEME],
    );

    const { customization } = useCustomizationData(clientEnv.NEXT_PUBLIC_WORKSPACE_ID);

    const theme = useMemo<Theme>(
        () => {
            if (!customization)
                return defaultTheme;

            const formatted = formatThemePalette(customization);

            return createTheme({
                ...defaultTheme,
                cssVariables: true,
                palette: {
                    ...defaultTheme.palette,
                    ...(formatted && formatted),
                },
            });
        },
        [customization,],
    ) ;

    return theme;
}

export default useDynamicThemeContextState;
