'use client'

import dynamic from 'next/dynamic';

import { useAtomValue } from 'jotai';

import type {
    Shop,
    Workspace,
    Customization,
} from 'shared/models';
import { useScroll } from 'shared/hooks';
import {
    workspaceAtom,
    customizationAtom,
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
};

export default function Header(props: OwnHeaderProps) {
    'use memo'
    const {} = props;

    const { moving } = useScroll();

    const workspace = useAtomValue(workspaceAtom);
    const customization = useAtomValue(customizationAtom)

    const childProps: HeaderProps = {
        scrolling: moving,
        workspace,
        customization,
        shops: workspace?.shops || [],
    };

    return (
        <DeviceDetector
            MobileComponent={<HeaderMobile {...childProps}/>}
            DesktopComponent={<HeaderMobile {...childProps}/>}
        />
    );
};
