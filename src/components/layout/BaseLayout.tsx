'use client'

import {
    Fragment,
    type FC,
    type ReactNode,
    type ReactElement,
} from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { useShallow, } from 'zustand/react/shallow';

import type {
    Workspace
} from 'shared/models';
import {
    workspaceAtom,
    hydratedWorkspaceAtom,
} from 'shared/state';
import { useSyncLanguageWithRouter, } from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';

import { Box, } from 'ui/index';

import Header from 'common/Header';
import BottomNavigation from 'common/BottomNavigation';

import DeviceDetectorLayout from './DeviceDetectorLayout';

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
        [ hydratedWorkspaceAtom, initialWorkspace, ] as any,
    ] as const);

    const {
        showHeader,
        showBottomNavigation,
    } = useApplicationStore(
        useShallow(store => store),
    );

    const {
        loading,
    } = useSyncLanguageWithRouter();

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
