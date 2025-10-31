'use client'

import type {
    FC,
} from 'react';

import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';
import {
    Separator as BaseSeparator,
} from '@base-ui-components/react/separator';

export const separator = tv({
    base: 'bg-[var(--mui-palette-grey-100)]',
    variants: {
        orientation: {
            vertical: 'h-4 w-px',
            horizontal: 'w-full h-px',
        },
    },
});

export type SeparatorVariants = VariantProps<typeof separator>;

export type SeparatorProps = SeparatorVariants & BaseSeparator.Props & {
    className?: ClassValue;
};

const Separator: FC<SeparatorProps> = (props: SeparatorProps) => {
    const {
        children,
        orientation = 'horizontal',
        className,
        ...rest
    } = props;

    return (
        <BaseSeparator
            {...rest}
            className={separator({
                orientation,
                className,
            })}
        >
            {children}
        </BaseSeparator>
    );
};

export default Separator;
