'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations, } from 'next-intl';

import dynamic from 'next/dynamic';

import type {
    Workspace
} from 'shared/models';
import { workspaceAtom } from 'shared/state';

import DeviceDetectorLayout from 'common/DeviceDetector';

import SkeletonMobile from './mobile/skeleton';

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
    workspace: Workspace | null;
};

export default function SignIn(
    props: OwnSignInProps,
): ReactElement<FC<SignInProps>> {
    'use memo'
    const {} = props;

    const t = useTranslations();

    const workspace = useAtomValue(workspaceAtom);

    const childProps: SignInProps = {
        t,
        workspace,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<SignInMobile {...childProps}/>}
            DesktopComponent={<SignInDesktop {...childProps}/>}
        />
    );
};
