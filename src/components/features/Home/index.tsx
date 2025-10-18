'use client'

import {
    useCallback,
    useEffect,
    useState,
    type FC,
    type ReactElement,
} from 'react';
import { useAtomValue } from 'jotai';
import { useTranslations, } from 'next-intl';

import {
    currentShopAtom,
    hydratedWorkspaceAtom
} from 'shared/state/wm';

import { createClient } from 'lib/supabase/browser';

import DeviceDetectorLayout from 'layout/DeviceDetectorLayout';

import HomeMobile from './mobile';
import HomeDesktop from './desktop';

type OwnHomeProps = object;

export type HomeProps = {
    t: ReturnType<typeof useTranslations>;
    offers: Array<any>;
    currentShop: any;
    shops: Array<any>;
    categories: Array<any>;
};

export default function Home(
    props: OwnHomeProps,
): ReactElement<FC<OwnHomeProps>> {
    const {} = props;

    const t = useTranslations();

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
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<HomeMobile {...childProps}/>}
            DesktopComponent={<HomeDesktop {...childProps}/>}
        />
    );
};
