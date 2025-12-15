'use client'

import {
    type FC,
    type ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    useHideUI,
    useNavigation,
} from 'shared/hooks';

import DeviceDetector from 'common/device-detector';

import NewWorkspaceMobile from './mobile';
import NewWorkspaceDesktop from './desktop';

type OwnNewWorkspaceProps = object;

export type NewWorkspaceProps = {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
};

export default function NewWorkspace(
    props: OwnNewWorkspaceProps,
): ReactElement<FC<OwnNewWorkspaceProps>> {
    const {} = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const t = useTranslations();
    const navigation = useNavigation();

    const childProps: NewWorkspaceProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetector
            MobileComponent={<NewWorkspaceMobile {...childProps}/>}
            DesktopComponent={<NewWorkspaceDesktop {...childProps}/>}
        />
    );
};
