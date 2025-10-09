'use client'

import type {
    FC,
    ReactElement,
} from 'react';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import NotFoundMobile from './mobile';
import NotFoundDesktop from './desktop';

type OwnNotFoundProps = {
    title: string;
    description: string;
    navigation: string;
};

export type NotFoundProps = OwnNotFoundProps & object;

export default function NotFound(
    props: OwnNotFoundProps
): ReactElement<FC<OwnNotFoundProps>> {
    const childProps: NotFoundProps = {
        ...props,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<NotFoundMobile {...childProps}/>}
            DesktopComponent={<NotFoundDesktop {...childProps}/>}
        />
    );
};
