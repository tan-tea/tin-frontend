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

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

const PrivacyMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
        loading: () => <Loading/>
    },
);

type Props = Readonly<{ locale: string; }>;

export type PrivacyProps = Props & {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
    workspace: Workspace;
};

export default function Privacy(props: Props) {
    'use memo'
    const { locale } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: false,
    });

    const t = useTranslations();
    const navigation = useNavigation();

    const { navigate } = useNavigation();

    const workspace = useAtomValue(workspaceAtom);

    if (!workspace) {
        navigate('not-found');
        return null;
    }

    const childProps: PrivacyProps = {
        t,
        locale,
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
