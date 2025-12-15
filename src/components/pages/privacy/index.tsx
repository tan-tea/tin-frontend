'use client'

import type {
    FC,
    ReactElement,
} from 'react';

import { useTranslations, } from 'next-intl';

import {
    useHideUI,
    useNavigation,
} from 'shared/hooks';

import DeviceDetector from 'common/device-detector';

// import SearchMobile from './mobile';
// import SearchDesktop from './desktop';

type Props = object;

export type PrivacyProps = {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
};

export default function Privacy(
    props: Props,
): ReactElement<FC<Props>> {
    'use memo'
    const {} = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: false,
    });

    const t = useTranslations();
    const navigation = useNavigation();

    const childProps: PrivacyProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetector
            MobileComponent={<></>}
            DesktopComponent={<></>}
        />
    );
};
