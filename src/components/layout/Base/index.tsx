'use client'

import type {
    FC,
    ReactNode,
    ReactElement,
} from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import { useShallow, } from 'zustand/react/shallow';

import type {
    Workspace
} from 'shared/models';
import {
    useHideUI,
    useSyncLanguageWithRouter,
} from 'shared/hooks';
import { workspaceAtom, } from 'shared/state';
import { useApplicationStore, } from 'shared/stores/application-store';

import DeviceDetectorLayout from 'common/DeviceDetector';

import BaseLayoutMobile from './mobile';
import BaseLayoutDesktop from './desktop';

type OwnBaseLayoutProps = {
    children: ReactNode;
    initialWorkspace: Workspace;
}

export type BaseLayoutProps = Omit<OwnBaseLayoutProps, 'initialWorkspace'> & {
    showHeader?: boolean;
    showBottomNavigation?: boolean;
};

export default function BaseLayout(
    props: OwnBaseLayoutProps,
): ReactElement<FC<OwnBaseLayoutProps>> | null {
    'use memo'
    const {
        children,
        initialWorkspace,
    } = props;

    useHideUI({
        hideHeader: false,
        hideBottomNavigation: true,
    });

    useHydrateAtoms([
        [ workspaceAtom, initialWorkspace, ] as any,
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
