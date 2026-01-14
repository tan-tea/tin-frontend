'use client'

import type { ReactNode } from 'react';

import { useShallow, } from 'zustand/react/shallow';

import {
    loadCartAtom,
    loadCustomizationAtom,
    loadHistoryAtom,
    loadWorkspaceAtom,
    loadCategoryAtom,
    loadShopAtom,
} from 'shared/state';
import {
    useHydrateAndSyncAtom,
    useSyncLanguageWithRouter
} from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';

import { useWorkspaceData } from './hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

import WorkspaceLayoutMobile from './mobile';

type Props = Readonly<{
    children: ReactNode;
    workspaceId: string;
}>;

export type WorkspaceLayoutProps = Props & {
    showHeader?: boolean;
    showBottomNavigation?: boolean;
};

export default function WorkspaceLayout(props: Props) {
    'use memo'
    const { children, workspaceId } = props;

    useSyncLanguageWithRouter();

    /**
     * Atoms hydration and synchronization.
     * Useful for persisting state across sessions and offline support.
     */
    useHydrateAndSyncAtom([
        [loadCartAtom, null],
        [loadHistoryAtom, []],
        [loadWorkspaceAtom, null],
        [loadCustomizationAtom, null],
        [loadCategoryAtom, null],
        [loadShopAtom, null],
    ] as any, false);

    const { isLoading } = useWorkspaceData(workspaceId)

    const {
        loading: globalLoading,
        showHeader,
        showBottomNavigation,
    } = useApplicationStore(
        useShallow(store => store),
    );

    const childProps: WorkspaceLayoutProps = {
        children,
        workspaceId,
        showHeader,
        showBottomNavigation,
    };

    const loading = isLoading || globalLoading;
    if (loading) return <Loading/>;

    return (
        <DeviceDetector
            MobileComponent={<WorkspaceLayoutMobile {...childProps}/>}
            DesktopComponent={<WorkspaceLayoutMobile {...childProps}/>}
        />
    );
}
