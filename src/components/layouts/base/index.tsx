'use client'

import type { ReactNode } from 'react';

import { toast } from 'sonner';
import { useEffect } from 'react';
import { useShallow, } from 'zustand/react/shallow';

import type {
    Workspace
} from 'shared/models';
import {
    useCache,
    useHydrateAndSyncAtom,
    useSyncLanguageWithRouter,
} from 'shared/hooks';
import { workspaceAtom, } from 'shared/state';
import { useApplicationStore, } from 'shared/stores/application-store';

import DeviceDetector from 'common/device-detector';

import BaseLayoutMobile from './mobile';
import BaseLayoutDesktop from './desktop';

type OwnBaseLayoutProps = {
    children: ReactNode;
    initialWorkspace: Workspace | null;
}

export type BaseLayoutProps = Omit<OwnBaseLayoutProps, 'initialWorkspace'> & {
    showHeader?: boolean;
    showBottomNavigation?: boolean;
};

export default function BaseLayout(props: OwnBaseLayoutProps) {
    'use memo'
    const {
        children,
        initialWorkspace,
    } = props;

    if (!initialWorkspace) {
        toast.error('Something went wrong');
        return null;
    }

    useHydrateAndSyncAtom([
        [ workspaceAtom, initialWorkspace, ],
    ] as const, false);

    useSyncLanguageWithRouter();

    const {
        save
    } = useCache('workspaces', workspaceAtom);

    const {
        loading,
        showHeader,
        showBottomNavigation,
    } = useApplicationStore(
        useShallow(store => store),
    );

    useEffect(() => {
        if (!initialWorkspace) return;

        save({
            ...initialWorkspace,
            id: 'current',
            _id: initialWorkspace.id,
        });
    }, [initialWorkspace,]);

    const childProps: BaseLayoutProps = {
        children,
        showHeader,
        showBottomNavigation,
    };

    if (loading) return null;

    return (
        <DeviceDetector
            MobileComponent={<BaseLayoutMobile {...childProps}/>}
            DesktopComponent={<BaseLayoutDesktop {...childProps}/>}
        />
    );
}
