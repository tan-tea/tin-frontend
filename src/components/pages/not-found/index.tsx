'use client'

import DeviceDetector from 'common/device-detector';

import NotFoundMobile from './mobile';
import NotFoundDesktop from './desktop';

type OwnNotFoundProps = {
    title: string;
    description: string;
    navigation: string;
};

export type NotFoundProps = OwnNotFoundProps & object;

export default function NotFound(props: OwnNotFoundProps) {
    const {} = props;

    const childProps: NotFoundProps = {
        ...props,
    };

    return (
        <DeviceDetector
            MobileComponent={<NotFoundMobile {...childProps}/>}
            DesktopComponent={<NotFoundDesktop {...childProps}/>}
        />
    );
};
