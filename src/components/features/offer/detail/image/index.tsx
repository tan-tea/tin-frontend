'use client'

import type { FC, ReactEventHandler } from 'react';

import Image from 'next/image';

import { useRef } from 'react';
import { motion, MotionNodeAnimationOptions } from 'motion/react';

import BlankImage from 'public/images/blank.svg';

import { toBase64 } from 'lib/utils';

import { useComputedStyle } from 'shared/hooks';

type OfferDetailImageProps = Readonly<{
    alt: string;
    image: string;
}>;

const IMAGE_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        opacity: 0,
        filter: 'blur(20px)',
    },
    animate: {
        opacity: 1,
        filter: 'none',
    },
    transition: {
        opacity: {
            type: 'spring',
            duration: 0.25,
        },
        filter: {
            type: 'decay',
            duration: 0.5,
            delay: 0.25,
        },
    },
} as const;

const OfferDetailImage: FC<OfferDetailImageProps> = ({
    alt,
    image,
}) => {
    'use memo'
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const containerComputedStyle = useComputedStyle(containerRef.current);

    const handleImageLoad: ReactEventHandler<HTMLImageElement> = (event) => {
        if (!imageRef.current)
            imageRef.current = event.currentTarget;
    };

    return (
        <motion.div
            {...IMAGE_ANIMATION}
            role='banner'
            ref={containerRef}
            aria-label={alt}
            aria-description={alt}
            className='relative w-full min-w-dvw h-80 bg-[var(--mui-palette-grey-50)]'
        >
            <Image
                priority
                loading='eager'
                placeholder={`data:image/svg+xml;base64,${toBase64(BlankImage)}`}
                alt={alt}
                src={image ?? BlankImage}
                ref={imageRef}
                width={parseFloat(containerComputedStyle?.width ?? '420')}
                height={parseFloat(containerComputedStyle?.height ?? '420')}
                className='size-full object-cover'
                onLoad={handleImageLoad}
            />
        </motion.div>
    );
};

export default OfferDetailImage;
