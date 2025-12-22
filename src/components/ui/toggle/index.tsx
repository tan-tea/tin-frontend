'use client'

import type {
    FC,
    ComponentProps
} from 'react';
import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';

import IconButton from 'ui/icon-button';

const toggle = tv({
    base: 'outline-none data-[pressed]:color-[var(--mui-palette-primary-main)]',
    variants: {},
});

type ToggleVariants = VariantProps<typeof toggle>;

type ToggleProps = ComponentProps<typeof BaseToggle>
& ComponentProps<typeof IconButton>
& ToggleVariants;

export const Toggle: FC<ToggleProps> = ({
    className,
    ...props
}) => {
    'use memo'
    return (
        <BaseToggle
            {...props}
            data-slot='toggle'
            render={<IconButton
                borderless
                size='sm'
            />}
            className={toggle({
                className: className as ClassValue,
            })}
        />
    );
}
