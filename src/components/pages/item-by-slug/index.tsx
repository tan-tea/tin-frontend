'use client'

import dynamic from 'next/dynamic';

import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { createFormControl, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type {
    Offer,
    OptionGroup,
} from 'shared/models';
import { useHideUI } from 'shared/hooks';

import { useOfferBySlugData } from './hooks';

import Loading from 'pages/loading';
import DeviceDetector from 'common/device-detector';

const ItemBySlugMobile = dynamic(
    () => import('./mobile'),
    {
        loading: () => <Loading/>,
    },
);

type Props = Readonly<{
    itemSlug: string;
}>;

const createOptionGroupsSchema = (optionGroups: Array<OptionGroup>) =>
    z.object({
        options: z
            .record(z.string(), z.array(z.string()))
            .superRefine((options, ctx) => {
                for (const optionGroup of optionGroups) {
                    const { group } = optionGroup;

                    const selected = options[group.id] || [];

                    const minGroupItems = group.min ?? 1;
                    const maxGroupItems = group.max;

                    if (group.required && selected.length < minGroupItems) {
                        ctx.addIssue({
                            path: ['options', group.id],
                            message: `Selecciona al menos ${minGroupItems} opcion`,
                            code: 'custom',
                        });
                    }

                    if (group.max && selected.length > maxGroupItems) {
                        ctx.addIssue({
                            path: ['options', group.id],
                            message: `Maximo ${maxGroupItems} opciones`,
                            code: 'custom',
                        });
                    }
                }
            }),
    });

export type OptionGroups = z.infer<ReturnType<typeof createOptionGroupsSchema>>;

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

    const formControl = createFormControl<OptionGroups>({
        resolver: zodResolver(createOptionGroupsSchema(offer.optionGroups)),
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

    if (isLoading) return <Loading/>;

    return (
        <DeviceDetector
            MobileComponent={<ItemBySlugMobile {...childProps}/>}
            DesktopComponent={<ItemBySlugMobile {...childProps}/>}
        />
    );
};
