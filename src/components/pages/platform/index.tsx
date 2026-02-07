'use client';
import type { Shop, Workspace } from 'shared/models';

import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';

import { useNavigation } from 'shared/hooks';
import { workspaceAtom } from 'shared/state';

import { useShopsByWorkspaceData } from './hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

import PlatformMobile from './mobile';
import PlatformDesktop from './mobile';

type Props = Readonly<{
    locale: string;
    workspaceId: string;
}>;

export type PlatformProps = Readonly<{
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
    shops: Array<Shop>;
    primaryShop: Shop | null;
    hasMultipleShops: boolean;
    workspace: Workspace;
}>;

export default function Platform(props: Props) {
    'use memo';
    const { workspaceId } = props;

    const t = useTranslations();
    const navigation = useNavigation();

    const workspace = useAtomValue(workspaceAtom);

    const {
        shops,
        primaryShop,
        hasMultipleShops,
        isLoading,
    } = useShopsByWorkspaceData(workspaceId);

    if (isLoading) return <Loading/>

    const childProps: PlatformProps = {
        t,
        navigation,
        shops,
        primaryShop,
        hasMultipleShops,
        workspace: workspace!,
    };

    return (
        <DeviceDetector
            MobileComponent={<PlatformMobile {...childProps}/>}
            DesktopComponent={<PlatformDesktop {...childProps}/>}
        />
    );
}
