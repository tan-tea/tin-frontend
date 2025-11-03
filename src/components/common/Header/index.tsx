'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useAtomValue } from 'jotai';

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
} from 'shared/state';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

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

export default function Header(
    props: OwnHeaderProps,
): ReactElement<FC<OwnHeaderProps>> {
    const {} = props;

    const {
        moving,
    } = useScroll();

    const workspace = useAtomValue(workspaceAtom);
    const customization = useAtomValue(customizationAtom)

    const childProps: HeaderProps = {
        scrolling: moving,
        workspace,
        customization,
        shops: workspace?.shops || [],
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<HeaderMobile {...childProps}/>}
            DesktopComponent={<HeaderDesktop {...childProps}/>}
        />
    );
};
