'use client'

import type { ReactNode } from 'react';

import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
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

    useHideUI({
        hideHeader: false,
        hideBottomNavigation: true,
    });

    useSyncLanguageWithRouter();

    useHydrateAtoms([
        [ workspaceAtom, initialWorkspace, ] as any,
    ] as const);

    const t = useTranslations();

    const {
        loading,
        showHeader,
        showBottomNavigation,
    } = useApplicationStore(
        useShallow(store => store),
    );

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
