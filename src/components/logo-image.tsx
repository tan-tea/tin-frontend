'use client'

import type { FC, ComponentProps } from 'react';

import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';

import Image from 'next/image';
import BlankImage from 'public/images/blank.svg';

import { toBase64 } from 'lib/utils';

const logoImage = tv({
    base: 'h-8 w-auto object-contain fill-[var(--mui-palette-primary-main)]',
});

type LogoImageVariants = VariantProps<typeof logoImage>;

type LogoImageProps = LogoImageVariants & ComponentProps<typeof Image>;

const LogoImage: FC<LogoImageProps> = ({
    alt,
    src,
    ...props
}) => {
    'use memo'

    return (
        <Image
            priority
            quality={100}
            loading='eager'
            placeholder={`data:image/svg+xml;base64,${toBase64(BlankImage)}`}
            alt={alt}
            src={src}
            height={40}
            width={100}
            className={logoImage({
                className: props.className as ClassValue,
            })}
            {...props}
        />
    );
}

export default LogoImage;
