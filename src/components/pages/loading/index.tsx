'use client'

import { useTranslations, } from 'next-intl';

import { useNavigation, } from 'shared/hooks';

import DeviceDetector from 'common/device-detector';

import LoadingMobile from './mobile';
// import LoadingDesktop from './desktop';

type OwnLoadingProps = object;

export type LoadingProps = {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
};

export default function Loading(props: OwnLoadingProps) {
    'use memo'
    const {} = props;

    const t = useTranslations('loading');
    const navigation = useNavigation();

    const childProps: LoadingProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetector
            MobileComponent={<LoadingMobile {...childProps}/>}
            DesktopComponent={<LoadingMobile {...childProps}/>}
        />
    );
};
