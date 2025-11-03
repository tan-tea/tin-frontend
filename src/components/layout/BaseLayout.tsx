'use client'

import {
    Fragment,
    type FC,
    type ReactNode,
    type ReactElement,
} from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { useShallow, } from 'zustand/react/shallow';

import dynamic from 'next/dynamic';

import type {
    Workspace
} from 'shared/models';
import { workspaceAtom, } from 'shared/state';
import { useSyncLanguageWithRouter, } from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';

import { Box, } from 'ui/index';

import BottomNavigation from 'common/BottomNavigation';

import DeviceDetectorLayout from './DeviceDetectorLayout';

const Header = dynamic(
    () => import('common/Header'),
);

type OwnBaseLayoutProps = {
    children: ReactNode;
    initialWorkspace: Workspace;
}

export type BaseLayoutProps = Omit<OwnBaseLayoutProps, 'initialWorkspace'> & {
    showHeader?: boolean;
    showBottomNavigation?: boolean;
};

const BaseLayoutMobile: FC<BaseLayoutProps> = (
    props: BaseLayoutProps,
) => {
    const {
        children,
        showHeader,
        showBottomNavigation,
    } = props;

    return (
        <Fragment>
            {showHeader && <Header/>}
            <Box className={`relative bg-inherit dark:bg-dark-600 dark:text-light-600 ${showHeader ? 'top-header-mobile' : ''}`}>
                {children}
            </Box>
            {showBottomNavigation && <BottomNavigation/>}
        </Fragment>
    );
}

const BaseLayoutDesktop: FC<BaseLayoutProps> = (
    props: BaseLayoutProps,
) => {
    const {
        children,
        showHeader,
        showBottomNavigation,
    } = props;

    return (
        <Fragment>
            {showHeader && <Header/>}
            <Box className={`relative bg-inherit ${showHeader ? 'top-header-desktop' : ''}`}>
                {children}
            </Box>
            {showBottomNavigation && <BottomNavigation/>}
        </Fragment>
    );
}

export default function BaseLayout(
    props: OwnBaseLayoutProps,
): ReactElement<FC<OwnBaseLayoutProps>> | null {
    const {
        children,
        initialWorkspace,
    } = props;

    useHydrateAtoms([
        [ workspaceAtom, initialWorkspace, ] as any,
        // [ hydratedWorkspaceAtom, initialWorkspace, ] as any,
    ] as const);

    const {
        loading,
        showHeader,
        showBottomNavigation,
    } = useApplicationStore(
        useShallow(store => store),
    );

    useSyncLanguageWithRouter();

    const childProps: BaseLayoutProps = {
        children,
        showHeader,
        showBottomNavigation,
    };

    if (!initialWorkspace || loading) return null;

    return (
        <DeviceDetectorLayout
            MobileComponent={<BaseLayoutMobile {...childProps}/>}
            DesktopComponent={<BaseLayoutDesktop {...childProps}/>}
        />
    );
}
