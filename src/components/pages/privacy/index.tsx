'use client'

import dynamic from 'next/dynamic';

import { useAtomValue } from 'jotai';
import { useTranslations, } from 'next-intl';

import type {
    Workspace
} from 'shared/models';
import {
    useHideUI,
    useNavigation,
} from 'shared/hooks';
import { workspaceAtom } from 'shared/state';

import DeviceDetector from 'common/device-detector';

const PrivacyMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
    },
);

type Props = Readonly<object>;

export type PrivacyProps = Props & {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
    workspace: Workspace;
};

export default function Privacy(props: Props) {
    'use memo'
    const {} = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: false,
    });

    const t = useTranslations();
    const navigation = useNavigation();

    const workspace = useAtomValue(workspaceAtom);

    if (!workspace) return null;

    const childProps: PrivacyProps = {
        t,
        navigation,
        workspace,
    };

    return (
        <DeviceDetector
            MobileComponent={<PrivacyMobile {...childProps}/>}
            DesktopComponent={<PrivacyMobile {...childProps}/>}
        />
    );
};
