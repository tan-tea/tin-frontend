'use client'

import {
    type FC,
    type ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';

import {
    useHideUI,
    useNavigation,
} from 'shared/hooks';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import SearchMobile from './mobile';
// import SearchDesktop from './desktop';

type OwnSearchProps = object;

export type SearchProps = {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
};

export default function Search(
    props: OwnSearchProps,
): ReactElement<FC<OwnSearchProps>> {
    const {} = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: false,
    });

    const t = useTranslations();
    const navigation = useNavigation();

    const childProps: SearchProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<SearchMobile {...childProps}/>}
            DesktopComponent={<SearchMobile {...childProps}/>}
        />
    );
};
