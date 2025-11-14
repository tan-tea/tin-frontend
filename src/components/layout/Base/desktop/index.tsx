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

type BaseLayoutDesktopProps = BaseLayoutProps;

const BaseLayoutDesktop: FC<BaseLayoutDesktopProps> = ({
    children,
    showHeader,
    showBottomNavigation,
}) => {
    'use memo'

    return (
        <>
            {showHeader && <Header/>}
            <Box className={`relative bg-inherit ${showHeader ? 'top-header-desktop' : ''}`}>
                {children}
            </Box>
        </>
    );
}

export default BaseLayoutDesktop;
