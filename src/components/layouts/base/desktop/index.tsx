'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import type { BaseLayoutProps } from 'layouts/base';

const Header = dynamic(
    () => import('components/common/header'),
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
            <div className={`relative bg-inherit ${showHeader ? 'top-header-desktop' : ''}`}>
                {children}
            </div>
        </>
    );
}

export default BaseLayoutDesktop;
