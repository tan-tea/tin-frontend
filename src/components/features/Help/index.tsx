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

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: false,
    });

    const t = useTranslations();
    const navigation = useNavigation();

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
