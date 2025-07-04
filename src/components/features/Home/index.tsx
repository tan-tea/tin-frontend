'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import HomeMobile from './mobile';
import HomeDesktop from './desktop';

type OwnHomeProps = object;

export type HomeProps = {
    t: ReturnType<typeof useTranslations>;
};

export default function Home(
    props: OwnHomeProps,
): ReactElement<FC<OwnHomeProps>> {
    const {} = props;

    const t = useTranslations();

    const childProps: HomeProps = {
        t,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<HomeMobile {...childProps}/>}
            DesktopComponent={<HomeDesktop {...childProps}/>}
        />
    );
};
