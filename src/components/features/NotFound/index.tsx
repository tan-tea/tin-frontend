'use client'

import {
    FC,
    ReactElement,
} from 'react';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import NotFoundMobile from './mobile';
import NotFoundDesktop from './desktop';

type NotFoundProps = object;

export default function NotFound(
    props: NotFoundProps
): ReactElement<FC<NotFoundProps>> {
    return (
        <DeviceDetectorLayout
            mobileComponent={<NotFoundMobile {...props}/>}
            desktopComponent={<NotFoundDesktop {...props}/>}
        />
    );
};
