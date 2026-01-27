'use client'

import type { FC } from 'react';
import type { Offer } from 'shared/models';
import type { PlatformProps } from 'pages/platform';

import Autoplay from 'embla-carousel-autoplay';

import { secondsToMilliseconds } from 'date-fns';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from 'ui/carousel';
import { Main } from 'ui/layout';
import { Badge } from 'ui/badge';
import { Heading } from 'ui/text';
import { InternalLink } from 'ui/link';

import StoreCard from 'features/store/card';
import OfferCard from 'features/offer/card';

type Props = PlatformProps;

const PlatformMobile: FC<Props> = ({
    t,
    shops,
    workspace,
}) => {
    'use memo'

    return (
        <Main
            role='application'
            aria-label={t('metadata.siteName')}
            aria-description={t('metadata.description')}
            className='h-dvh-screen-mobile min-h-0'
        >
            <Carousel className='size-full py-2 flex flex-col gap-y-6'>
                <CarouselContent className='size-full ml-0'>
                    {shops.map(shop => {
                        const offers = shop?.offers
                            .map(o => o.offer)
                            .filter((offer): offer is Offer => offer !== undefined);

                        const hasOffers = offers && offers.length > 0;

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
                                            {(workspace.categories ?? []).map(category => (
                                                <CarouselItem key={category.id} className='ml-4 min-w-auto shrink basis-auto'>
                                                    <Badge
                                                        position='flex'
                                                        variant='outline'
                                                        className='text-base px-4'
                                                    >
                                                        {category.label}
                                                    </Badge>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                </Carousel>
                                <div className='px-4'>
                                    <StoreCard shop={shop}/>
                                </div>
                                {hasOffers && (
                                    <Carousel
                                        opts={{ loop: true }}
                                        plugins={[
                                            Autoplay({
                                                playOnInit: true,
                                                delay: secondsToMilliseconds(5),
                                            }),
                                        ]}
                                        className='flex flex-col gap-y-4 px-4'
                                    >
                                        <div className='flex items-center justify-between'>
                                            <Heading>Recientes</Heading>
                                            <InternalLink href={`/store/${shop.slug}` as any}>Ver todos</InternalLink>
                                        </div>
                                        <CarouselContent>
                                            {offers.map(offer => (
                                                <CarouselItem key={offer.id} className='pl-4'>
                                                    <OfferCard offer={offer}/>
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
