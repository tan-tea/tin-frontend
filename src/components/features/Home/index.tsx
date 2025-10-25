'use client'

import {
    useCallback,
    useEffect,
    useState,
    type FC,
    type ReactElement,
} from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslations, } from 'next-intl';

import type {
    Shop,
    Category
} from 'shared/models';
import {
    currentCategoryAtom,
    currentShopAtom,
    hydratedWorkspaceAtom,
} from 'shared/state';

import { getOffersByShopId } from 'app/actions';

import { createClient } from 'lib/supabase/browser';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import HomeMobile from './mobile';
import HomeDesktop from './desktop';

type OwnHomeProps = object;

export type HomeProps = {
    t: ReturnType<typeof useTranslations>;
    offers: Array<any>;
    currentShop: Shop | null;
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
    const currentShop = useAtomValue(currentShopAtom);

    const [offers, setOffers] = useState<any[]>([]);

    const getAllOffersByShop = useCallback(
        async () => {
            const supabase = createClient();
            const {
                data,
                error,
            } = await supabase
                .from('offers')
                .select('*')
                .eq('shop_id', currentShop?.id)
                .eq('is_active', true);

            if (error) return [];

            return data;
        },
        [currentShop?.id],
    );

    const handleSelectCategory: (id: string) => void = (id) => {
        if (id === selectedCategory) setSelectedCategory(null);
        else setSelectedCategory(id);
    };

    useEffect(() => {
        if (currentShop?.id)
            getOffersByShopId(currentShop?.id)
                .then(result => {
                    console.log('result', result);
                });
    }, [currentShop?.id]);

    useEffect(() => {
        let isSubscribed = true;

        if (isSubscribed) {
            getAllOffersByShop()
                .then(setOffers);
        }

        return () => {
            isSubscribed = false;
        };
    }, [getAllOffersByShop,]);

    const childProps: HomeProps = {
        t,
        offers,
        currentShop,
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
