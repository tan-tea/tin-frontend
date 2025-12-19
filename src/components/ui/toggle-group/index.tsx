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
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';

const toggleGroup = tv({
    base: 'flex',
    variants: {
        orientation: {
            horizontal: 'flex-row items-center gap-x-2',
            vertical: 'flex-col justify-center gap-y-2',
        },
    },
});

type ToggleGroupVariants = VariantProps<typeof toggleGroup>;

type ToggleGroupProps = ComponentProps<typeof BaseToggleGroup>
& ToggleGroupVariants;

export const ToggleGroup: FC<ToggleGroupProps> = ({
    className,
    orientation = 'horizontal',
    ...props
}) => {
    'use memo'

    return (
        <BaseToggleGroup
            {...props}
            orientation={orientation}
            data-slot='toggle-group'
            className={toggleGroup({
                orientation,
                className: className as ClassValue,
            })}
        />
    );
}
