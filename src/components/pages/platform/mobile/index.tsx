'use client'

import type { FC, ComponentProps } from 'react';
import type { Offer } from 'shared/models';
import type { PlatformProps } from 'pages/platform';

import Autoplay from 'embla-carousel-autoplay';

import { secondsToMilliseconds } from 'date-fns';

import { usePrefetch } from 'shared/hooks';

import {
    Heading,
    IconLabel
} from 'ui/text';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from 'ui/carousel';
import { Main } from 'ui/layout';
import { Badge } from 'ui/badge';
import { InternalLink } from 'ui/link';
import { MoveRight } from 'components/icons';

import StoreCard from 'features/store/card';
import OfferCard from 'features/offer/card';

type Props = PlatformProps;

function chunkOffers<T>(items: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < items?.length; i += size) {
        chunks.push(items.slice(i, i + size));
    }
    return chunks;
};

const PlatformMobile: FC<Props> = ({
    t,
    shops,
    workspace,
    navigation,
}) => {
    'use memo'
    const { prefetchRoute } = usePrefetch();

    const handleSlideChanged: ComponentProps<typeof Carousel>['onSlideChanged'] = (_, event) => {
        console.log('changed', event);
    }

    return (
        <Main
            role='application'
            aria-label={t('metadata.siteName')}
            aria-description={t('metadata.description')}
            className='h-full min-h-0'
        >
            <Carousel
                onSlideChanged={handleSlideChanged}
                className='size-full py-2 flex flex-col gap-y-6'>
                <CarouselContent className='size-full ml-0'>
                    {shops.map(shop => {
                        const offers = (shop?.offers ?? [])
                            .map(o => o.offer)
                            .filter((offer): offer is Offer => offer !== undefined);

                        const hasOffers = offers && offers.length > 0;
                        const offersPairs = chunkOffers(offers, 2);

                        return (
                            <CarouselItem key={shop.id} className='size-full grow flex flex-col gap-y-6 pl-0'>
                                <Carousel
                                    opts={{ loop: true }}
                                    plugins={[
                                        Autoplay({
                                            delay: secondsToMilliseconds(2),
                                            playOnInit: true,
                                        }),
                                    ]}
                                >
                                        <CarouselContent className='items-center'>
                                            {(workspace?.categories ?? []).map(category => {
                                                const target = `/category/${category.slug}`;

                                                return (
                                                    <CarouselItem key={category.id} className='ml-4 min-w-auto shrink basis-auto'>
                                                        <Badge
                                                            position='flex'
                                                            variant='outline'
                                                            className='text-base px-4'
                                                            onTap={() => prefetchRoute(target)}
                                                            onMouseEnter={() => prefetchRoute(target)}
                                                            onClick={() => navigation.navigate(target)}
                                                        >
                                                            {category.label}
                                                        </Badge>
                                                    </CarouselItem>
                                                );
                                            })}
                                        </CarouselContent>
                                </Carousel>
                                <div className='px-4'>
                                    <StoreCard shop={shop}/>
                                </div>
                                {hasOffers && (
                                    <Carousel
                                        opts={{ loop: false }}
                                        plugins={[
                                            Autoplay({
                                                playOnInit: true,
                                                delay: secondsToMilliseconds(5),
                                            }),
                                        ]}
                                        className='flex flex-col gap-y-4 px-4'
                                    >
                                        <div className='flex items-center justify-between'>
                                            <Heading>{t('recents')}</Heading>
                                            <InternalLink href={`/store/${shop.slug}` as any}>
                                                <IconLabel
                                                    dir='rtl'
                                                    icon={MoveRight}
                                                    color='primary'
                                                    label={t('showAll')}
                                                />
                                            </InternalLink>
                                        </div>
                                        <CarouselContent>
                                            {offersPairs.map((pair, index) => (
                                                <CarouselItem
                                                    key={index}
                                                    className='pl-4'
                                                >
                                                    <div className='grid grid-cols-2 gap-x-4'>
                                                        {pair.map(offer => (
                                                            <OfferCard
                                                                key={offer.id}
                                                                offer={offer}
                                                                target={`/store/${shop.slug}/item/${offer.slug}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                )}
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
            </Carousel>
        </Main>
    );
}

export default PlatformMobile;
