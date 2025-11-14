'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';

import dynamic from 'next/dynamic';

import DeviceDetectorLayout from 'common/DeviceDetector';

import SkeletonMobile from './mobile/skeleton';
// import SkeletonDesktop from './desktop/skeleton';

const SignInMobile = dynamic(
    () => import('./mobile'),
    {
        loading: () => <SkeletonMobile/>,
    },
);

const SignInDesktop = dynamic(
    () => import('./desktop'),
    {
        loading: () => <></>
    },
);

type OwnSignInProps = object;

export type SignInProps = {
    t: ReturnType<typeof useTranslations>;
};

export default function SignIn(
    props: OwnSignInProps,
): ReactElement<FC<SignInProps>> {
    'use memo'
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
