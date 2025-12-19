'use client'

import type { FC, ComponentProps } from 'react';

import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';
import {
    Separator as BaseSeparator,
} from '@base-ui/react/separator';

const separator = tv({
    base: 'bg-[var(--mui-palette-grey-100)]',
    variants: {
        orientation: {
            vertical: 'h-4 w-px',
            horizontal: 'w-full h-px',
        },
    },
});

type SeparatorVariants = VariantProps<typeof separator>;

type SeparatorProps = SeparatorVariants & ComponentProps<typeof BaseSeparator>;

const Separator: FC<SeparatorProps> = ({
    orientation = 'horizontal',
    className,
    ...props
}) => {
    'use memo'

    return (
        <BaseSeparator
            {...props}
            data-slot='separator'
            className={separator({
                orientation,
                className: className as ClassValue,
            })}
        />
    );
};

Separator.displayName = 'Separator';

export {
    Separator,
};
