'use client'

import {
    useEffect,
    type FC,
    type ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import {
    useNavigation,
} from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

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

    const t = useTranslations();
    const navigation = useNavigation();

    const {
        setShowHeader,
        setShowBottomNavigation,
    } = useApplicationStore(
        useShallow(store => store),
    );

    useEffect(() => {
        setShowHeader(false);
        setShowBottomNavigation(false);

        return () => {
            setShowHeader(true);
            setShowBottomNavigation(true);
        };
    }, [])

    const childProps: NewWorkspaceProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<NewWorkspaceMobile {...childProps}/>}
            DesktopComponent={<NewWorkspaceDesktop {...childProps}/>}
        />
    );
};
