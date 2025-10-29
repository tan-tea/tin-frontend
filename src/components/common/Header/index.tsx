'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useAtomValue } from 'jotai';

import type {
    Shop,
    Workspace
} from 'shared/models';
import { useScroll } from 'shared/hooks';
import { hydratedWorkspaceAtom } from 'shared/state';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import HeaderMobile from './mobile';
import HeaderDesktop from './desktop';

type OwnHeaderProps = object;

export type HeaderProps = {
    scrolling: boolean;
    workspace: Workspace;
    shops: Array<Shop>;
};

export default function Header(
    props: OwnHeaderProps,
): ReactElement<FC<OwnHeaderProps>> {
    const {} = props;

    const {
        moving,
    } = useScroll();

    const workspace = useAtomValue(hydratedWorkspaceAtom);

    const childProps: HeaderProps = {
        scrolling: moving,
        workspace,
        shops: workspace?.shops || [],
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<HeaderMobile {...childProps}/>}
            DesktopComponent={<HeaderDesktop {...childProps}/>}
        />
    );
};
