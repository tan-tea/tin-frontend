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

import TermsMobile from './mobile';
// import SearchDesktop from './desktop';

type Props = object;

export type TermsProps = {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
};

export default function Terms(
    props: Props,
): ReactElement<FC<Props>> {
    const {} = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: false,
    });

    const t = useTranslations();
    const navigation = useNavigation();

    const childProps: TermsProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetector
            MobileComponent={<TermsMobile {...childProps}/>}
            DesktopComponent={<TermsMobile {...childProps}/>}
        />
    );
};
