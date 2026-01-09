'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import { Fragment, Activity } from 'react';
import { cn } from 'tailwind-variants';

import type { WorkspaceLayoutProps } from 'layouts/workspace';

const Header = dynamic(
    () => import('components/common/header'),
    {
        ssr: false,
    },
);

const CartFloat = dynamic(
    () => import('features/cart/float'),
    {
        ssr: false,
    },
);

type Props = WorkspaceLayoutProps;

const WorkspaceLayoutMobile: FC<Props> = ({
    children,
    showHeader,
}) => {
    'use memo'

    const visibibility = showHeader ? 'visible' : 'hidden';

    return (
        <Fragment>
            <Activity mode={visibibility}>
                <Header/>
            </Activity>
            <div className={cn(
                'relative bg-inherit scrollbar-hide dark:bg-dark-600 dark:text-light-600',
                showHeader && 'top-header-mobile',
            )}>
                {children}
                <CartFloat/>
            </div>
        </Fragment>
    );
}

export default WorkspaceLayoutMobile;
