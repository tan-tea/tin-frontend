'use client'

import type {
    FC,
    ComponentProps,
} from 'react';
import { motion, } from 'motion/react';
import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';
import { Avatar as BaseAvatar, } from '@base-ui-components/react/avatar';

import Image from 'next/image';

import { cn } from 'lib/utils';

export const avatar = tv({
    slots: {
        root: cn(
            'inline-flex justify-center items-center border',
            'border-[var(--mui-palette-grey-600)]/25 align-middle',
            'rounded-full select-none overflow-hidden text-base bg-white dark:border-light-400'
        ),
        fallback: cn('size-full flex items-center justify-center text-sm p-0.5 font-medium font-primary'),
        image: cn('object-contain size-full'),
    },
    variants: {
        size: {
            sm: {
                root: 'size-7',
            },
            md: {
                root: 'size-8',
            },
            lg: {
                root: 'size-9',
            },
            xl: {
                root: 'size-10',
            },
            xxl: {
                root: 'size-11',
            },
            xxxl: {
                root: 'size-13',
            },
            full: {
                root: 'size-full',
            },
        },
        rounded: {
            sm: {
                root: 'rounded-sm',
            },
            md: {
                root: 'rounded-md',
            },
            lg: {
                root: 'rounded-lg',
            },
            xl: {
                root: 'rounded-xl',
            },
            xxl: {
                root: 'rounded-2xl',
            },
            full: {
                root: 'rounded-full',
            },
        }
    },
    defaultVariants: {},
});

export type AvatarVariants = VariantProps<typeof avatar>;

type AvatarRootProps = ComponentProps<typeof BaseAvatar.Root>
& AvatarVariants;

export const AvatarRoot: FC<AvatarRootProps> = ({
    size,
    rounded,
    className,
    ...props
}) => {
    'use memo'
    const { root } = avatar({
        size,
        rounded,
    });

    return <BaseAvatar.Root
        {...props}
        data-slot='avatar-root'
        render={<motion.span/>}
        className={root({
            className: className as ClassValue,
        })}
    />
};

type AvatarImageProps = ComponentProps<typeof BaseAvatar.Image>
& ComponentProps<typeof Image>
& AvatarVariants;

export const AvatarImage: FC<AvatarImageProps> = ({
    src,
    alt,
    height,
    width,
    size,
    rounded,
    ...props
}) => {
    'use memo'
    const { image } = avatar({
        size,
        rounded,
    });

    return <BaseAvatar.Image
        {...props}
        data-slot='avatar-image'
        src={src}
        alt={alt}
        width={width}
        height={height}
        render={(props) => <Image
            quality={75}
            src={src}
            alt={alt}
            {...props}
        />}
        className={image({
            className: props.className as ClassValue,
        })}
    />
};

type AvatarFallbackProps = ComponentProps<typeof BaseAvatar.Fallback>
& AvatarVariants;

export const AvatarFallback: FC<AvatarFallbackProps> = ({
    size,
    rounded,
    ...props
}) => {
    'use memo'
    const { fallback } = avatar({
        size,
        rounded,
    });

    return <BaseAvatar.Fallback
        {...props}
        data-slot='avatar-fallback'
        className={fallback({
            className: props.className as ClassValue,
        })}
    />
}
