'use client'

import type {
    FC,
    ReactElement,
} from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslations, } from 'next-intl';

import type {
    Shop,
    Category
} from 'shared/models';
import {
    currentCategoryAtom,
    hydratedWorkspaceAtom,
} from 'shared/state';
import { useOfferData } from 'shared/hooks/queries';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import HomeMobile from './mobile';
import HomeDesktop from './desktop';

type OwnHomeProps = object;

export type HomeProps = {
    t: ReturnType<typeof useTranslations>;
    offers: Array<any>;
    shops: Array<Shop>;
    categories: Array<Category>;
    selectedCategory: string | null;
    onSelectCategory: (id: string) => void;
};

export default function Home(
    props: OwnHomeProps,
): ReactElement<FC<OwnHomeProps>> {
    const {} = props;

    const t = useTranslations();

    const [
        selectedCategory,
        setSelectedCategory,
    ] = useAtom(currentCategoryAtom);

    const workspace = useAtomValue(hydratedWorkspaceAtom);

    const {
        data: offers,
        isLoading: offersLoading,
    } = useOfferData();

    const handleSelectCategory: (id: string) => void = (id) => {
        if (id === selectedCategory) setSelectedCategory(null);
        else setSelectedCategory(id);
    };

    const childProps: HomeProps = {
        t,
        offers,
        shops: workspace?.shops || [],
        categories: workspace?.categories || [],
        selectedCategory,
        onSelectCategory: handleSelectCategory,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<HomeMobile {...childProps}/>}
            DesktopComponent={<HomeMobile {...childProps}/>}
        />
    );
};
