'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import dynamic from 'next/dynamic';

import type {
    Shop,
    Workspace,
    Customization,
} from 'shared/models';
import { useScroll } from 'shared/hooks';
import {
    workspaceAtom,
    customizationAtom,
    currentShopAtom,
} from 'shared/state';

import DeviceDetector from 'common/device-detector';

import HeaderMobileSkeleton from './mobile/skeleton';

const HeaderMobile = dynamic(
    () => import('./mobile'),
    {
        loading: () => <HeaderMobileSkeleton/>,
    },
);

const HeaderDesktop = dynamic(
    () => import('./desktop'),
    {
        loading: () => <HeaderMobileSkeleton/>,
    },
);

type OwnHeaderProps = object;

export type HeaderProps = {
    scrolling: boolean;
    workspace: Workspace | null;
    customization: Customization | null;
    shops: Array<Shop>;
    currentShop: Shop | null;
    onSelectShop: (shopId: string) => void;
};

export default function Header(
    props: OwnHeaderProps,
): ReactElement<FC<OwnHeaderProps>> {
    'use memo'
    const {} = props;

    const {
        moving,
    } = useScroll();

    const workspace = useAtomValue(workspaceAtom);
    const customization = useAtomValue(customizationAtom)

    const [currentShop, setCurrentShop] = useAtom(currentShopAtom);

    const onSelectShop: HeaderProps['onSelectShop'] = (shopId) => {
        const selectedShop = workspace?.shops?.find?.(s => s?.id === shopId);
        if (!selectedShop) return;

        setCurrentShop(selectedShop);
    };

    const childProps: HeaderProps = {
        scrolling: moving,
        workspace,
        customization,
        shops: workspace?.shops || [],
        currentShop,
        onSelectShop,
    };

    return (
        <DeviceDetector
            MobileComponent={<HeaderMobile {...childProps}/>}
            DesktopComponent={<HeaderDesktop {...childProps}/>}
        />
    );
};
