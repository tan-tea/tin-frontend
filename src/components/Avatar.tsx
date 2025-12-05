'use client'

import type {
    FC,
    ComponentProps,
} from 'react';
import {
    tv,
    type VariantProps
} from 'tailwind-variants';

import { cn, } from 'lib/utils';

import {
    AvatarRoot,
    AvatarImage,
    AvatarFallback,
} from 'ui/avatar';
import { Icon, User } from 'icons/index';

const avatar = tv({
    slots: {
        root: cn('ring shrink-0'),
    },
    variants: {
        selected: {
            true: {
                root: cn('ring-[var(--mui-palette-primary-main)]'),
            },
            false: {
                root: cn('ring-[var(--mui-palette-primary-50)]'),
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
                {/* {getValueInitials(fallback)} */}
                <Icon
                    value={User}
                    className='text-dark-600 size-10'
                />
            </AvatarFallback>
        </AvatarRoot>
    );
}

export default Avatar;
