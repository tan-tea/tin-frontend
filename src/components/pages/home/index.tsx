'use client'

import {
    useMemo,
    type FC,
    type ReactElement,
} from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslations, } from 'next-intl';

import dynamic from 'next/dynamic';

import type {
    Offer,
    Shop,
    Category,
    Workspace,
} from 'shared/models';
import {
    workspaceAtom,
    currentCategoryAtom,
    currentShopAtom,
} from 'shared/state';
import { useOffersData } from 'shared/hooks/queries';

import DeviceDetector from 'common/device-detector';

import SkeletonMobile from './mobile/skeleton';
import SkeletonDesktop from './desktop/skeleton';

const HomeMobile = dynamic(
    () => import('./mobile'),
    {
        loading: () => <SkeletonMobile/>,
    },
);

const HomeDesktop = dynamic(
    () => import('./desktop'),
    {
        loading: () => <SkeletonDesktop/>,
    },
);

type OwnHomeProps = object;

export type HomeProps = {
    t: ReturnType<typeof useTranslations>;
    offers: Array<Offer>;
    offersLoading?: boolean;
    shops: Array<Shop>;
    currentWorkspace: Workspace | null;
    categories: Array<Category>;
    selectedCategory: Category | null;
    onSelectCategory: (category: Category | undefined) => void;
};

export default function Home(): ReactElement<FC<OwnHomeProps>> {
    'use memo'
    const t = useTranslations();

    const [
        selectedCategory,
        setSelectedCategory,
    ] = useAtom(currentCategoryAtom);

    const workspace = useAtomValue(workspaceAtom);
    const currentShop = useAtomValue(currentShopAtom);

    const {
        data: offersData,
        isLoading: offersLoading,
    } = useOffersData({
        shopId: currentShop?.id!,
    });

    const handleSelectCategory: HomeProps['onSelectCategory'] = (category) => {
        if (!category) return;

        if (category?.id === selectedCategory?.id) setSelectedCategory(null);
        else setSelectedCategory(category);
    };

    const offers = useMemo<Array<Offer>>(
        () => {
            if (!offersData) return [];

            return selectedCategory?.id
                ? offersData?.filter?.(o => o?.categoryId === selectedCategory?.id)
                : offersData;
        },
        [offersData, selectedCategory]
    );

    const childProps: HomeProps = {
        t,
        offers,
        offersLoading,
        currentWorkspace: workspace,
        shops: workspace?.shops || [],
        categories: workspace?.categories || [],
        selectedCategory,
        onSelectCategory: handleSelectCategory,
    };

    return (
        <DeviceDetector
            MobileComponent={<HomeMobile {...childProps}/>}
            DesktopComponent={<HomeMobile {...childProps}/>}
        />
    );
};
