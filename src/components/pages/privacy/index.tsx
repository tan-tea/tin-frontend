'use client'

import type { Workspace } from 'shared/models';

import { useTranslations, } from 'next-intl';

import {
    useHideUI,
    useNavigation,
} from 'shared/hooks';

import { useWorkspaceData } from 'layouts/workspace/hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

import PrivacyMobile from './mobile';
import PrivacyDesktop from './mobile';

type Props = Readonly<{
    locale: string;
    workspaceId: string;
}>;

export type PrivacyProps = Props & Readonly<{
    t: ReturnType<typeof useTranslations>;
    navigate: ReturnType<typeof useNavigation>['navigate'];
    workspace: Workspace;
}>;

export default function Privacy(props: Props) {
    'use memo'
    const { locale, workspaceId } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: false,
    });

    const t = useTranslations();

    const { navigate } = useNavigation();

    const {
        workspace,
        isLoading,
    } = useWorkspaceData(workspaceId);

    if (isLoading) return <Loading/>

    const childProps: PrivacyProps = {
        t,
        locale,
        workspaceId,
        navigate,
        workspace: workspace!,
    };

    return (
        <DeviceDetector
            MobileComponent={<PrivacyMobile {...childProps}/>}
            DesktopComponent={<PrivacyDesktop {...childProps}/>}
        />
    );
};
