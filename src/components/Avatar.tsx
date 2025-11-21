'use client'

import type {
    FC,
    ComponentProps,
} from 'react';
import {
    tv,
    type VariantProps
} from 'tailwind-variants';

import { cn, getValueInitials, } from 'lib/utils';

import {
    AvatarRoot,
    AvatarImage,
    AvatarFallback,
} from 'ui/avatar';

const avatar = tv({
    slots: {
        root: 'ring shrink-0',
    },
    variants: {
        selected: {
            true: {
                root: 'ring-[var(--mui-palette-primary-main)]',
            },
            false: {
                root: 'ring-[var(--mui-palette-primary-50)]',
            },
        },
    },
    defaultVariants: {
        selected: false,
    },
});

type AvatarVariants = VariantProps<typeof avatar>;

type AvatarProps = AvatarVariants & ComponentProps<typeof AvatarRoot> & {
    src?: string;
    fallback: string;
};

const Avatar: FC<AvatarProps> = ({
    src,
    size,
    selected,
    fallback,
    ...props
}) => {
    'use memo'

    const {
        root,
    } = avatar({
        selected,
    });

    return (
        <AvatarRoot
            size={size}
            className={root()}
        >
            <AvatarImage
                fill={false}
                src={src!}
                alt={fallback}
                width={48}
                height={48}
            />
            <AvatarFallback>
                {getValueInitials(fallback)}
            </AvatarFallback>
        </AvatarRoot>
    );
}

export default Avatar;
