'use client'

import dynamic from 'next/dynamic';

import { useTranslations, } from 'next-intl';

import type {
    Workspace
} from 'shared/models';
import {
    useHideUI,
    useNavigation,
} from 'shared/hooks';

import { useWorkspaceData } from 'layouts/workspace/hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

const PrivacyMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
        loading: () => <Loading/>
    },
);

type Props = Readonly<{
    locale: string;
    workspaceId: string;
}>;

export type PrivacyProps = Props & {
    t: ReturnType<typeof useTranslations>;
    navigate: ReturnType<typeof useNavigation>['navigate'];
    workspace: Workspace;
};

export default function Privacy(props: Props) {
    'use memo'
    const { locale, workspaceId } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: false,
    });

    const t = useTranslations();

    const { navigate } = useNavigation();

    const { workspace } = useWorkspaceData(workspaceId);

    if (!workspace) {
        navigate('not-found');
        return null;
    }

    const childProps: PrivacyProps = {
        t,
        locale,
        workspaceId,
        navigate,
        workspace,
    };

    return (
        <DeviceDetector
            MobileComponent={<PrivacyMobile {...childProps}/>}
            DesktopComponent={<PrivacyMobile {...childProps}/>}
        />
    );
};
