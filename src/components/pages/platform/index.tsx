'use client'

import dynamic from 'next/dynamic';

import { useMemo, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import type {
    Shop,
    Workspace
} from 'shared/models';
import { workspaceAtom } from 'shared/state';
import { useHideUI, useNavigation } from 'shared/hooks';

import DeviceDetector from 'common/device-detector';

import PlatformMobileSkeleton from './mobile/skeleton';

const PlatformMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
        loading: () => <PlatformMobileSkeleton/>,
    },
);

type OwnPlatformProps = Readonly<{ shops: Array<Shop> }>;

export type PlatformProps = OwnPlatformProps & Readonly<{
    t: ReturnType<typeof useTranslations>;
    workspace: Workspace;
    multipleStores: boolean;
}>;

export default function Platform(props: OwnPlatformProps) {
    'use memo'
    const { shops } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const { navigate } = useNavigation();

    const t = useTranslations();

    const workspace = useAtomValue(workspaceAtom);

    const multipleStores = useMemo<boolean>(
        () => shops.length > 1,
        [shops]
    );

    useEffect(
        () => {
            if (multipleStores) return;

            const mainStore = shops.find(s => s.isPrimary) ?? shops.at(0);

            if (!mainStore) return;

            navigate(`/store/${mainStore.slug}`);
        },
        [
            shops,
            navigate,
            multipleStores,
        ]
    );

    const childProps: PlatformProps = {
        t,
        shops,
        multipleStores,
        workspace: workspace!,
    };

    if (!multipleStores) return null;

    return (
        <DeviceDetector
            MobileComponent={<PlatformMobile {...childProps}/>}
            DesktopComponent={<PlatformMobile {...childProps}/>}
        />
    );
}
