'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import type { WorkspaceLayoutProps } from 'layouts/workspace';

const Header = dynamic(
    () => import('components/common/header'),
);

type Props = WorkspaceLayoutProps;

const WorkspaceLayoutDesktop: FC<Props> = ({
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

export default WorkspaceLayoutDesktop;
