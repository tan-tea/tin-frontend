'use client'

import {
    useRef,
    type FC,
    type ComponentProps,
    type ReactEventHandler,
} from 'react';
import {
    ClassValue,
    tv,
    type VariantProps
} from 'tailwind-variants';
import { motion, MotionNodeAnimationOptions } from 'motion/react';

import Image from 'next/image';
import BlankImage from 'public/images/blank.svg';

import { toBase64 } from 'lib/utils';
import { useComputedStyle } from 'shared/hooks';

import { Box } from 'ui/index';

const productDetailImage = tv({
    slots: {
        container: 'relative w-full min-w-dvw h-80 bg-[var(--mui-palette-grey-50)]',
        image: 'size-full object-cover',
    },
    variants: {},
    defaultVariants: {},
});

type ProductDetailImageVariants = VariantProps<typeof productDetailImage>;

type ProductDetailImageProps = ProductDetailImageVariants & Pick<ComponentProps<'div'>, 'style'> & {
    alt: string;
    image: string;
    className?: ClassValue;
    imageClassName?: ClassValue;
};

const DEFAULT_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        filter: 'blur(20px)',
    },
    animate: {
        filter: 'none',
    },
    transition: {
        type: 'decay',
        duration: 1.25,
    },
};

const ProductDetailImage: FC<ProductDetailImageProps> = (props) => {
    const {
        alt,
        image,
        className,
        imageClassName,
        style,
    } = props;

    const {
        container,
        image: imageSlot,
    } = productDetailImage();

    const containerRef = useRef<HTMLElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const imageComputedStyle = useComputedStyle(imageRef.current);
    const containerComputedStyle = useComputedStyle(containerRef.current);

    const handleImageLoad: ReactEventHandler<HTMLImageElement> = (event) => {
        if (!imageRef.current)
            imageRef.current = event.currentTarget;
    };

    return (
        <Box
            {...DEFAULT_ANIMATION}
            ref={containerRef}
            role='banner'
            aria-label={alt}
            aria-labelledby={alt}
            aria-description={alt}
            aria-describedby={alt}
            component={motion.article}
            style={style}
            className={container({
                className,
            })}
        >
            <Image
                priority
                loading='eager'
                placeholder={`data:image/svg+xml;base64,${toBase64(BlankImage)}`}
                alt={alt}
                src={image}
                ref={imageRef}
                width={parseFloat(containerComputedStyle?.width ?? '420')}
                height={parseFloat(containerComputedStyle?.height ?? '420')}
                className={imageSlot({
                    className: imageClassName,
                })}
                onLoad={handleImageLoad}
            />
        </Box>
    );
};

export default ProductDetailImage;
