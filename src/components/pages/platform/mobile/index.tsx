'use client'

import type { FC } from 'react';
import type { PlatformProps } from 'pages/platform';

import dynamic from 'next/dynamic';
import Autoplay from 'embla-carousel-autoplay';

import { useAtomValue } from 'jotai';

import { offersAtom } from 'shared/state';

import { Main } from 'ui/layout';
import { Badge } from 'ui/badge';
import { InternalLink } from 'ui/link';
import { Heading, Paragraph } from 'ui/text';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from 'ui/carousel';

import StoreCard from 'features/store/card';
import OfferCard from 'components/features/offer/card';

type Props = PlatformProps;

const PlatformMobile: FC<Props> = ({
    t,
    shops,
    workspace,
}) => {
    'use memo'
    const offers = useAtomValue(offersAtom);

    return (
        <Main
            role='application'
            aria-label={t('metadata.siteName')}
            aria-description={t('metadata.description')}
            className='h-dvh-screen-mobile min-h-0'
        >
            <div className='size-full p-4 py-2 flex flex-col gap-y-6'>
                <Carousel
                    opts={{ loop: true }}
                    plugins={[
                        Autoplay({
                            delay: 2000,
                            playOnInit: true,
                        }),
                    ]}
                >
                        <CarouselContent className='items-center'>
                            {(workspace.categories ?? []).map(category => (
                                <CarouselItem key={category.id} className='min-w-auto shrink basis-auto'>
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
                <Carousel>
                    <CarouselContent>
                        {shops.map(shop => (
                            <CarouselItem key={shop.id}>
                                <StoreCard shop={shop}/>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <Carousel
                    opts={{ loop: true }}
                    plugins={[
                        Autoplay({
                            playOnInit: true,
                            delay: 5000,
                        }),
                    ]}
                    className='flex flex-col gap-y-4'
                >
                    <div className='flex items-center justify-between'>
                        <Heading>Recientes</Heading>
                        <InternalLink href={`/store/${shops?.[0]?.slug}` as any}>Ver todos</InternalLink>
                    </div>
                    <CarouselContent>
                        {offers.map(offer => (
                            <CarouselItem key={offer.id}>
                                <OfferCard offer={offer}/>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </Main>
    );
}

export default PlatformMobile;
