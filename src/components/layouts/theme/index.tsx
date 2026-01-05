'use client'

import type { ReactNode } from 'react';

import { ThemeProvider } from '@mui/material';

import { useDynamicTheme } from 'shared/contexts/dynamic-theme';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function ThemeLayout(props: Props) {
    const { children, } = props;

    const theme = useDynamicTheme();

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};
