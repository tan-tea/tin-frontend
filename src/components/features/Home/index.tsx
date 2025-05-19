'use client'

import {
    FC,
    ReactElement,
} from 'react';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import HomeMobile from './mobile';
import HomeDesktop from './desktop';

type NotFoundProps = object;

export default function Home(
    props: NotFoundProps
): ReactElement<FC<NotFoundProps>> {
    return (
        <DeviceDetectorLayout
            mobileComponent={<HomeMobile {...props}/>}
            desktopComponent={<HomeDesktop {...props}/>}
        />
    );
};
