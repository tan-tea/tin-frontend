'use client'

import type { FC } from 'react';
import {
    motion,
    type HTMLMotionProps,
} from 'motion/react';
import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';
import { Avatar as BaseAvatar, } from '@base-ui-components/react/avatar';

import { getValueInitials } from 'lib/utils';

export const avatar = tv({
    slots: {
        root: 'inline-flex justify-center items-center align-middle rounded-full select-none overflow-hidden text-base bg-white dark:border-light-400',
        fallback: 'size-full flex items-center justify-center text-sm font-medium font-primary',
        image: 'object-cover size-full p-0.5',
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

export type AvatarProps = AvatarVariants & HTMLMotionProps<'span'> & BaseAvatar.Root.Props & {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: ClassValue;
};

const Avatar: FC<AvatarProps> = (props: AvatarProps) => {
    const {
        alt,
        className,
        src = '/logo.svg',
        size = 'xl',
        rounded = 'full',
        width = 0,
        height = 0,
        ...rest
    } = props;

    const {
        root,
        fallback,
        image,
    } = avatar({ size, rounded, });

    return (
        <BaseAvatar.Root
            {...rest}
            className={root({
                className,
            })}
            render={<motion.span/>}
        >
            <BaseAvatar.Image
                src={src}
                alt={alt}
                className={image()}
            />
            {alt && (
                <BaseAvatar.Fallback className={fallback()}>
                    {getValueInitials(alt)}
                </BaseAvatar.Fallback>
            )}
        </BaseAvatar.Root>
    );
};

export default Avatar;
