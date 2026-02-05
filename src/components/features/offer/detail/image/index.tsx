'use client'

import type { FC } from 'react';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { useMemo } from 'react';
import { useAtomValue } from 'jotai';

import BlankImage from 'public/images/blank.svg';

import { offerAtom } from 'shared/state';
import { OfferImage } from 'shared/models/offer-image';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from 'ui/carousel';

type Props = Readonly<object>;

type ImageInput = Pick<OfferImage, 'image' | 'description'>;

type ImageOutput = {
    src: string;
    alt: string;
};

function getImageFormat(images: Array<ImageInput>): Array<ImageOutput> {
    return images?.map(image => ({
        src: image.image,
        alt: image.description ?? '',
    }));
}

const OfferDetailImage: FC<Props> = () => {
    'use memo'
    const offer = useAtomValue(offerAtom);
    if (!offer) return null;

    const alt = offer?.title ?? 'Product image';
    const src = offer?.banner ?? BlankImage;

    const images = useMemo(
        () => getImageFormat([
            {
                image: offer.banner,
                description: offer.title,
            },
            ...offer.images.map(image => ({
                image: image.image,
                description: image.description,
            })),
        ]),
        [offer],
    );

    return (
        <Carousel
            role='banner'
            aria-label={offer.title}
            aria-description={offer.description}
            opts={{ loop: true }}
            plugins={[
                Autoplay()
            ]}
            className='relative w-full h-86'
        >
            <CarouselContent className='size-full -m-0'>
                {images.map((image, index) => (
                    <CarouselItem key={`${image.alt}-${index}`} className='relative'>
                        <Image
                            fill
                            priority
                            loading='eager'
                            alt={alt}
                            src={src}
                            className='object-cover'
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default OfferDetailImage;
