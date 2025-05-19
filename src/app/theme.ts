'use client'

import { createTheme, } from '@mui/material/styles';

const theme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            '50': '#f4f8fa',
            '100': '#e6eef3',
            '200': '#d2e0eb',
            '300': '#b4ccdc',
            '400': '#8fb2cb',
            '500': '#759abc',
            '600': '#5e81ac',
            '700': '#57739e',
            '800': '#4b5f82',
            '900': '#3f5069',
            main: '#5e81ac',
        },
        secondary: {
            '50': '#fcf6f4',
            '100': '#f8ece8',
            '200': '#f4dcd4',
            '300': '#ebc3b6',
            '400': '#dd9f8c',
            '500': '#d08770',
            '600': '#b8644a',
            '700': '#9a523b',
            '800': '#804634',
            '900': '#6b3f31',
            main: '#d08770',
        },
        grey: {
            '50': '#f6f6f6',
            '100': '#e7e7e7',
            '200': '#d1d1d1',
            '300': '#b0b0b0',
            '400': '#808080',
            '500': '#6d6d6d',
            '600': '#5d5d5d',
            '700': '#4f4f4f',
            '800': '#454545',
            '900': '#3d3d3d',
            'A100': '#262626',
        },
    },
    typography: {
        fontFamily: 'var(--font-primary)',
    },
});

export default theme;
