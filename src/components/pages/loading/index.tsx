'use client'

import dynamic from 'next/dynamic';

import { useTranslations, } from 'next-intl';

import { useNavigation, } from 'shared/hooks';

import DeviceDetector from 'common/device-detector';

const LoadingMobile = dynamic(
    () => import('./mobile'),
    {
        ssr: false,
    },
);

type Props = Readonly<object>;

export type LoadingProps = Props & {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
};

export default function Loading(props: Props) {
    'use memo'
    const { } = props;

    const t = useTranslations();
    const navigation = useNavigation();

    const childProps: LoadingProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetector
            MobileComponent={<LoadingMobile {...childProps}/>}
            DesktopComponent={<LoadingMobile {...childProps}/>}
        />
    );
};
