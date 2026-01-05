'use client'

import type { FC } from 'react';

import Image from 'next/image';

import { useAtomValue } from 'jotai';
import { motion, MotionNodeAnimationOptions } from 'motion/react';

import BlankImage from 'public/images/blank.svg';

import { offerAtom } from 'shared/state';

type Props = Readonly<object>;

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

const OfferDetailImage: FC<Props> = () => {
    'use memo'
    const currentOffer = useAtomValue(offerAtom);
    // TODO: return fallback.
    if (!currentOffer) return null;

    const alt = currentOffer?.title ?? 'Product image';
    const src = currentOffer?.banner ?? BlankImage;

    return (
        <motion.div
            {...IMAGE_ANIMATION}
            role='banner'
            aria-label={alt}
            aria-description={alt}
            className='relative w-full h-86 bg-[var(--mui-palette-grey-50)]'
        >
            <Image
                fill
                priority
                loading='eager'
                alt={alt}
                src={src}
                className='object-cover'
            />
        </motion.div>
    );
};

export default OfferDetailImage;
