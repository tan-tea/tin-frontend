'use client'

import type {
    FC
} from 'react';
import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';

import { cn } from 'lib/utils';
import { clientEnv } from 'env/client';

import {
    Box,
    AppBar,
} from 'ui/index';

import type {
    HeaderProps
} from 'common/Header';

import Menu from 'common/Menu';
import Search from 'common/Search';
import Logo from 'components/Logo';

const header = tv({
    slots: {
        root: cn(
            'h-header-mobile py-4 z-50 rounded-b-2xl shadow-none',
            'bg-white dark:bg-dark-600',
        ),
        wrapper: cn('size-full px-4'),
        logo: cn(),
        navigation: cn('ml-auto'),
    },
    variants: {
        variant: {
            start: {
                wrapper: cn('flex items-center'),
                navigation: cn('flex items-center gap-x-4'),
            },
            center: {
                wrapper: cn('grid grid-cols-3 items-center'),
                navigation: cn('flex items-center'),
            },
        },
    },
    defaultVariants: {
        variant: 'center',
    }
});

type HeaderVariants = VariantProps<typeof header>;

type HeaderMobileProps = HeaderProps & HeaderVariants;

type HeaderMobileVariant = Omit<HeaderMobileProps, 'scrolling'>;

const StartVariant: FC<HeaderMobileVariant> = ({
    variant,
}) => {
    'use memo'
    const {
        wrapper,
        navigation,
    } = header({
        variant,
    });

    return (
        <Box className={wrapper()}>
            <Logo/>
            <Box className={navigation()}>
                <Search/>
                <Menu/>
            </Box>
        </Box>
    );
};

const CenterVariant: FC<HeaderMobileVariant> = ({
    variant,
}) => {
    'use memo'
    const {
        wrapper,
        navigation,
    } = header({
        variant,
    });

    return (
        <Box className={wrapper()}>
            <Search/>
            <Box className='h-full flex items-center gap-x-1'>
                <Logo/>
            </Box>
            <Box className={navigation()}>
                <Menu/>
            </Box>
        </Box>
    );
};

const layoutMap = {
    'start': StartVariant,
    'center': CenterVariant,
} as const;

const defaultVariant = clientEnv.NEXT_PUBLIC_WORKSPACE_VARIANT || 'center';

const HeaderMobile: FC<Omit<HeaderMobileProps, 'variant'>> = ({
    scrolling,
    ...props
}) => {
    'use memo'
    const { root } = header({
        variant: defaultVariant,
    });

    const Layout = layoutMap?.[defaultVariant] || layoutMap?.['center'];

    return (
        <AppBar
            position='fixed'
            scrolling={scrolling}
            className={root()}
        >
            <Layout
                {...props}
                variant={defaultVariant}
            />
        </AppBar>
    );
}

export default HeaderMobile;
