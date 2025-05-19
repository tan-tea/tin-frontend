'use client'

import {
    FC,
    ReactElement,
} from 'react';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import SignInMobile from './mobile';
import SignInDesktop from './desktop';

type SignInProps = object;

export default function SignIn(
    props: SignInProps
): ReactElement<FC<SignInProps>> {
    return (
        <DeviceDetectorLayout
            mobileComponent={<SignInMobile {...props}/>}
            desktopComponent={<SignInDesktop {...props}/>}
        />
    );
};
