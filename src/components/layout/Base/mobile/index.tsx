'use client'

import type {
    FC
} from 'react';

import dynamic from 'next/dynamic';

import { cn } from 'lib/utils';

import Box from 'ui/box';

import type { BaseLayoutProps } from 'layout/Base';

const Header = dynamic(
    () => import('common/Header'),
);

type BaseLayoutMobileProps = BaseLayoutProps;

const BaseLayoutMobile: FC<BaseLayoutMobileProps> = ({
    children,
    showHeader,
}) => {
    'use memo'

    return (
        <>
            {showHeader && <Header/>}
            <Box className={cn(
                'relative bg-inherit scrollbar-hide dark:bg-dark-600 dark:text-light-600',
                showHeader && 'top-header-mobile',
            )}>
                {children}
            </Box>
        </>
    );
}

export default BaseLayoutMobile;
