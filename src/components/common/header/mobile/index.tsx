'use client'

import type { FC } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv, cn } from 'tailwind-variants';

import { clientEnv } from 'env/client';

import { AppBar } from 'ui/index';

import type {
    HeaderProps
} from 'components/common/header';

import Search from 'common/Search';
import Logo from 'components/logo';
import NavigationDrawer from 'features/navigation/drawer';

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
                wrapper: cn('grid grid-cols-5 items-center'),
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
        <div className={wrapper()}>
            <Logo/>
            <div className={navigation()}>
                <Search/>
                <NavigationDrawer/>
            </div>
        </div>
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
        <div className={wrapper()}>
            <Search/>
            <div className='col-span-3 flex items-center justify-center'>
                <Logo/>
            </div>
            <div className={navigation()}>
                <NavigationDrawer/>
            </div>
        </div>
    );
};

const layoutMap = {
    'start': StartVariant,
    'center': CenterVariant,
} as const;

const defaultVariant = clientEnv.NEXT_PUBLIC_WORKSPACE_VARIANT ?? 'center';

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
