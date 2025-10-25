import { createTheme } from '@mui/material';

export type ThemeOptions = Parameters<typeof createTheme>[0];

const DEFAULT_THEME: ThemeOptions = {
    cssVariables: true,
    palette: {
        'primary': {
            '50': '#eff3fe',
            '100': '#e2e8fd',
            '200': '#cbd4fa',
            '300': '#acb8f5',
            '400': '#8a92ef',
            '500': '#6e6fe6',
            '600': '#5b51d8',
            '700': '#4f44be',
            '800': '#41399a',
            '900': '#38357a',
            'A100': '#221f47',
            'main': '#5b51d8',
        },
        'secondary': {
            '50': '#faf6fe',
            '100': '#f2ebfc',
            '200': '#e7dafa',
            '300': '#d5bdf5',
            '400': '#bc93ed',
            '500': '#a269e3',
            '600': '#8b4ad3',
            '700': '#7737b9',
            '800': '#5d2e8c',
            '900': '#52297a',
            'A100': '#371358',
            'main': '#5d2e8c',
        },
        'info': {
            '50': '#fef1fa',
            '100': '#fee5f8',
            '200': '#ffcbf2',
            '300': '#ffa1e7',
            '400': '#ff67d3',
            '500': '#f93bbd',
            '600': '#eb26a3',
            '700': '#cc0a80',
            '800': '#a80c69',
            '900': '#8c0f59',
            'A100': '#560133',
            'main': '#eb26a3',
        },
        'grey': {
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
    components: {
        MuiTextField: {}
    }
};

export default DEFAULT_THEME;
