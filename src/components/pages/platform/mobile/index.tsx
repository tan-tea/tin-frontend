'use client'

import type { FC } from 'react';
import type { PlatformProps } from 'pages/platform';

import Autoplay from 'embla-carousel-autoplay';

import { useAtomValue } from 'jotai';
import { secondsToMilliseconds } from 'date-fns';

import { offersAtom } from 'shared/state';

import { Main } from 'ui/layout';
import { Badge } from 'ui/badge';
import { Heading } from 'ui/text';
import { InternalLink } from 'ui/link';
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
            <Carousel className='size-full py-2 flex flex-col gap-y-6'>
                <CarouselContent className='size-full ml-0'>
                    {shops.map(shop => {
                        return (
                            <CarouselItem key={shop.id} className='size-full grow flex flex-col gap-y-6 pl-0'>
                                <Carousel
                                    opts={{ loop: true }}
                                    plugins={[
                                        Autoplay({
                                            delay: secondsToMilliseconds(5),
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
                                <Carousel>
                                    <CarouselContent className='px-4'>
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
                                            delay: secondsToMilliseconds(10),
                                        }),
                                    ]}
                                    className='flex flex-col gap-y-4 px-4'
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
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
            </Carousel>
        </Main>
    );
}

export default PlatformMobile;
