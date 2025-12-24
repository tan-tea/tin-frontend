'use client'

import type {
    FC,
    ReactNode,
    ReactElement,
} from 'react';
import { ThemeProvider } from '@mui/material';

import { useDynamicTheme } from 'shared/contexts/dynamic-theme';

type ThemeProviderLayoutProps = {
    children: ReactNode;
};

export default function ThemeLayout(
    props: ThemeProviderLayoutProps
): ReactElement<FC<ThemeProviderLayoutProps>> {
    const { children, } = props;

    const {
        theme,
    } = useDynamicTheme();

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};
