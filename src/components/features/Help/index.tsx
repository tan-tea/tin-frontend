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

// import SearchMobile from './mobile';
// import SearchDesktop from './desktop';

type OwnHelpProps = object;

export type HelpProps = {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
};

export default function Help(
    props: OwnHelpProps,
): ReactElement<FC<OwnHelpProps>> {
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
        // setShowBottomNavigation(false);

        return () => {
            setShowHeader(true);
            // setShowBottomNavigation(true);
        };
    }, [])

    const childProps: HelpProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetectorLayout
            // MobileComponent={<SearchMobile {...childProps}/>}
            // DesktopComponent={<SearchDesktop {...childProps}/>}
            MobileComponent={<></>}
            DesktopComponent={<></>}
        />
    );
};
