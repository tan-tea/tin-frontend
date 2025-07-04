'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import SignInMobile from './mobile';
import SignInDesktop from './desktop';

type OwnSignInProps = object;

export type SignInProps = {
    t: ReturnType<typeof useTranslations>;
};

export default function SignIn(
    props: OwnSignInProps,
): ReactElement<FC<SignInProps>> {
    const {} = props;

    const t = useTranslations();

    const childProps: SignInProps = {
        t,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<SignInMobile {...childProps}/>}
            DesktopComponent={<SignInDesktop {...childProps}/>}
        />
    );
};
