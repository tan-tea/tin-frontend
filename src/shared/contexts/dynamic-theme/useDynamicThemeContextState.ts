import {
    useMemo,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { createTheme, Theme} from '@mui/material';

import DEFAULT_THEME, {
    ThemeOptions
} from 'app/theme';
import { createClient } from 'lib/supabase/browser';
import { formatThemePalette } from 'lib/utils';

type DynamicThemeContextState = {
    theme: Theme;
};

type UseDynamicThemeHandler = () => DynamicThemeContextState;

const useDynamicThemeContextState: UseDynamicThemeHandler = () => {
    const defaultTheme = useMemo(
        () => DEFAULT_THEME,
        [],
    );

    const [theme, setTheme] = useState<Theme>(createTheme(defaultTheme));

    const loadTheme = useCallback(
        async () => {
            const supabase = createClient();

            const {
                data,
                error,
            } = await supabase
                .from('customizations')
                .select(`
                    *,
                    customization_colors (
                        *,
                        customization_color_variants ( * )
                    )
                `)
                .eq('workspace_id', process.env.NEXT_PUBLIC_WORKSPACE_ID)
                .single();

            const palette = formatThemePalette(data);

            const newTheme = createTheme({
                ...defaultTheme,
                cssVariables: true,
                palette: {
                    ...defaultTheme?.palette,
                    ...palette,
                },
            });

            return newTheme;
        },
        [defaultTheme,],
    );

    useEffect(() => {
        loadTheme()
            .then(setTheme)
            .catch(err => console.error(err));
    }, [loadTheme,]);

    return {
        theme,
    };
}

export default useDynamicThemeContextState;
