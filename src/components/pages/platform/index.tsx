'use client';

import dynamic from 'next/dynamic';

import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import type {
    Shop,
    Workspace
} from 'shared/models';
import { workspaceAtom } from 'shared/state';

import { useShopsByWorkspaceData } from './hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

const PlatformMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
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

    const t = useTranslations();

    const workspace = useAtomValue(workspaceAtom);

    console.log('workspace', workspace);

    const {
        shops,
        primaryShop,
        hasMultipleShops,
        isLoading,
    } = useShopsByWorkspaceData(workspaceId);

    const childProps: PlatformProps = {
        t,
        shops,
        primaryShop,
        hasMultipleShops,
        workspace: workspace!,
    };

    const loading = isLoading || !workspace;
    if (loading) return <Loading/>

    return (
        <DeviceDetector
            MobileComponent={<PlatformMobile {...childProps} />}
            DesktopComponent={<PlatformMobile {...childProps} />}
        />
    );
}
