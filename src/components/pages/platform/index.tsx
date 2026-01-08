'use client';

import dynamic from 'next/dynamic';

import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import type {
    Shop,
    Workspace
} from 'shared/models';
import { workspaceAtom } from 'shared/state';
import { useHideUI, useNavigation } from 'shared/hooks';

import { useShopsByWorkspaceData } from './hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

import PlatformMobileSkeleton from './mobile/skeleton';

const PlatformMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
        loading: () => <PlatformMobileSkeleton/>,
    }
);

type Props = Readonly<{
    locale: string;
    workspaceId: string;
}>;

export type PlatformProps = Readonly<{
    t: ReturnType<typeof useTranslations>;
    shops: Array<Shop>;
    primaryShop: Shop | null;
    hasMultipleShops: boolean;
    workspace: Workspace;
}>;

export default function Platform(props: Props) {
    'use memo';
    const { workspaceId } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: false,
    });

    const t = useTranslations();

    const { navigate } = useNavigation();

    const workspace = useAtomValue(workspaceAtom);

    const {
        shops,
        primaryShop,
        hasMultipleShops,
        isLoading,
    } = useShopsByWorkspaceData(workspaceId);

    // useEffect(() => {
    //     if (hasMultipleShops) return;
    //     if (!primaryShop) return;

    //     navigate(`/store/${primaryShop.slug}`);
    // }, [shops, primaryShop, hasMultipleShops, navigate]);

    const childProps: PlatformProps = {
        t,
        shops,
        primaryShop,
        hasMultipleShops,
        workspace: workspace!,
    };

    // if (isLoading || !hasMultipleShops) return <Loading/>
    const loading = isLoading;

    if (loading) return <Loading/>

    return (
        <DeviceDetector
            MobileComponent={<PlatformMobile {...childProps} />}
            DesktopComponent={<PlatformMobile {...childProps} />}
        />
    );
}
