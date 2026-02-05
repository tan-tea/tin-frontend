'use client'

import type { Offer } from 'shared/models';

import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';
import { createFormControl, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useHideUI } from 'shared/hooks';

import { useOfferBySlugData } from './hooks';
import { createOptionGroupsSchema, OptionGroups } from './schemas';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

import ItemBySlugMobile from './mobile';
import ItemBySlugDesktop from './desktop';

type Props = Readonly<{
    itemSlug: string;
}>;

export type ItemBySlugProps = Props & {
    t: ReturnType<typeof useTranslations>;
    offer: Offer;
    formControl: Omit<UseFormReturn<OptionGroups>, 'formState'>;
};

export default function ItemBySlug(props: Props) {
    'use memo'
    const { itemSlug } = props;

    useHideUI({
        hideHeader: true,
        hideBottomNavigation: true,
    });

    const t = useTranslations('OfferDetail');

    const {
        offer,
        isLoading,
    } = useOfferBySlugData(itemSlug);

    if (isLoading) return <Loading/>;

    if (!offer) return null;

    const optionGroups = offer.optionGroups ?? [];

    const formControl = createFormControl<OptionGroups>({
        resolver: zodResolver(createOptionGroupsSchema(optionGroups)),
        mode: 'all',
        reValidateMode: 'onChange',
        values: {
            options: {}, // default empty for enabled form submit when there arent options
        },
    });

    const childProps: ItemBySlugProps = {
        t,
        itemSlug,
        offer,
        formControl,
    };

    return (
        <DeviceDetector
            MobileComponent={<ItemBySlugMobile {...childProps}/>}
            DesktopComponent={<ItemBySlugMobile {...childProps}/>}
        />
    );
};
