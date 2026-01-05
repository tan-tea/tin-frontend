'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import { Fragment } from 'react';
import { cn } from 'tailwind-variants';

import type { WorkspaceLayoutProps } from 'components/layouts/workspace';

const Header = dynamic(
    () => import('components/common/header'),
);

type BaseLayoutMobileProps = WorkspaceLayoutProps;

const BaseLayoutMobile: FC<BaseLayoutMobileProps> = ({
    children,
    showHeader,
}) => {
    'use memo'

    return (
        <Fragment>
            {showHeader && <Header/>}
            <div className={cn(
                'relative bg-inherit scrollbar-hide dark:bg-dark-600 dark:text-light-600',
                showHeader && 'top-header-mobile',
            )}>
                {children}
            </div>
        </Fragment>
    );
}

export default BaseLayoutMobile;
