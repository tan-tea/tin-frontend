'use client'

import {
    useEffect,
    type FC,
    type ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';
import { useShallow, } from 'zustand/react/shallow';

import {
    useNavigation,
} from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';

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

    const t = useTranslations();
    const navigation = useNavigation();

    const {
        setShowHeader,
        setShowBottomNavigation,
    } = useApplicationStore(
        useShallow(store => store),
    );

    useEffect(() => {
        setShowHeader(false);

        return () => {
            setShowHeader(true);
        };
    }, [])

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
