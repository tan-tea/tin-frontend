'use client'

import type { FC } from 'react';
import type { VariantProps } from 'tailwind-variants';

import dynamic from 'next/dynamic';

import { useEffect, useMemo } from 'react';
import { tv, cn } from 'tailwind-variants';
import { useTranslations } from 'next-intl';

import type {
    Offer
} from 'shared/models';
import { useLocalStorage } from 'shared/hooks';

import {
    List,
    Grid,
    Fullscreen,
} from 'components/icons';
import { Heading } from 'ui/text';
import { Toggle } from 'ui/toggle';
import { Wrapper } from 'ui/layout';
import { ToggleGroup } from 'ui/toggle-group';

import OfferCardSkeleton from 'features/offer/card/skeleton';

const OfferCard = dynamic(
    () => import('features/offer/card'),
    {
        ssr: false,
        loading: () => <OfferCardSkeleton/>
    },
);

const list = tv({
    slots: {
        root: cn('size-full flex flex-col gap-y-2 p-4'),
        actions: cn('flex items-center'),
        actionsTitle: cn('font-nunito font-bold text-lg leading-5'),
        list: cn('size-full'),
    },
    variants: {
        view: {
            list: {
                list: cn(
                    'flex flex-col gap-y-2',
                    'md:grid md:grid-cols-2 gap-4',
                ),
            },
            grid: {
                list: cn(
                    'grid grid-cols-2 gap-x-2 gap-y-2',
                    'md:grid-cols-4 md:grap-x-4 md:gap-y-4'
                ),
            },
            complete: {
                list: cn('flex flex-col gap-y-4'),
            },
        },
    },
});

type ListVariants = VariantProps<typeof list>;

type OfferListProps = {
    offers?: Array<Offer>;
    showActions?: boolean;
    defaultView?: ListVariants['view'];
    forceDefaultView?: boolean;
};

const OfferList: FC<OfferListProps> = ({
    offers = [],
    showActions = true,
    defaultView = 'grid',
    forceDefaultView = false,
}) => {
    'use memo'
    const {
        root,
        actions,
        list: rootList,
    } = list();

    const t = useTranslations();

    const hasOffers = useMemo<boolean>(
        () => offers && offers.length > 0,
        [offers],
    );

    const [ view, setView ] = useLocalStorage<ListVariants['view']>('list', defaultView);

    const handleViewChange = (value: Array<any>) => {
        const [ newView, ] = value;

        if (!newView) setView('grid')
        else setView(newView);
    };

    useEffect(() => {
        if (defaultView && forceDefaultView) {
            setView(defaultView);
        }
    }, [defaultView, forceDefaultView, setView]);

    return (
        <Wrapper className={root()}>
            {showActions && (
                <div className={actions()}>
                    <Heading
                        role='feed'
                        aria-label='heading'
                    >
                        {t('offers')}
                    </Heading>
                    <ToggleGroup
                        value={[view]}
                        onValueChange={handleViewChange}
                        className='ml-auto'
                    >
                        <Toggle selected={view === 'list'} value='list' icon={List}/>
                        <Toggle selected={view === 'grid'} value='grid' icon={Grid}/>
                        <Toggle selected={view === 'complete'} value='complete' icon={Fullscreen}/>
                    </ToggleGroup>
                </div>
            )}
            <div className={rootList({
                view,
            })}>
                {hasOffers && offers.map(offer => <OfferCard
                    showDescription
                    key={offer.slug}
                    offer={offer}
                    variant={view}
                    size={offer.discount > 0 ? 'sm' : 'md'}
                />)}
            </div>
        </Wrapper>
    );
}

export default OfferList;
