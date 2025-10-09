'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';

import { useNavigation, } from 'shared/hooks';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import LoadingMobile from './mobile';
import LoadingDesktop from './desktop';

type OwnLoadingProps = object;

export type LoadingProps = {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
};

export default function Loading(
    props: OwnLoadingProps
): ReactElement<FC<OwnLoadingProps>> {
    const {} = props;

    const t = useTranslations('loading');
    const navigation = useNavigation();

    const childProps: LoadingProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<LoadingMobile {...childProps}/>}
            DesktopComponent={<LoadingDesktop {...childProps}/>}
        />
    );
};
