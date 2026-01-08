'use client'

import type { ReactNode } from 'react';

import { useAtom } from 'jotai';
import { useShallow, } from 'zustand/react/shallow';

import { loadCartAtom } from 'shared/state';
import { useHydrateAndSyncAtom, useSyncLanguageWithRouter } from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';

import { useWorkspaceData } from './hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

import WorkspaceLayoutMobile from './mobile';
import WorkspaceLayoutDesktop from './desktop';

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

    useHydrateAndSyncAtom([
        [loadCartAtom, null] as any
    ], false);

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
            DesktopComponent={<WorkspaceLayoutDesktop {...childProps}/>}
        />
    );
}
