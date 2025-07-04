'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';

import { useNavigation, } from 'shared/hooks';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import NotFoundMobile from './mobile';
import NotFoundDesktop from './desktop';

type OwnNotFoundProps = object;

export type NotFoundProps = {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
};

export default function NotFound(
    props: OwnNotFoundProps
): ReactElement<FC<OwnNotFoundProps>> {
    const {} = props;

    const t = useTranslations();
    const navigation = useNavigation();

    const childProps: NotFoundProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<NotFoundMobile {...childProps}/>}
            DesktopComponent={<NotFoundDesktop {...childProps}/>}
        />
    );
};
