'use client'

import type {
    FC
} from 'react';

import dynamic from 'next/dynamic';

import Box from 'ui/box';

import type { BaseLayoutProps } from 'layout/Base';

const Header = dynamic(
    () => import('common/Header'),
);

const BottomNavigation = dynamic(
    () => import('common/BottomNavigation'),
);

type BaseLayoutMobileProps = BaseLayoutProps;

const BaseLayoutMobile: FC<BaseLayoutMobileProps> = ({
    children,
    showHeader,
    showBottomNavigation
}) => {
    'use memo'

    return (
        <>
            {showHeader && <Header/>}
            <Box className={`relative bg-inherit dark:bg-dark-600 dark:text-light-600 ${showHeader ? 'top-header-mobile' : ''}`}>
                {children}
            </Box>
            {showBottomNavigation && <BottomNavigation/>}
        </>
    );
}

export default BaseLayoutMobile;
