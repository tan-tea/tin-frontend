'use client'

import type {
    FC,
} from 'react';
import { memo } from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as BaseTooltip,
    TooltipProps as BaseTooltipProps,
} from '@mui/material/Tooltip';

const tooltip = tv({
    slots: {
        base: 'text-xs font-primary rounded-sm shadow-sm bg-primary px-4 py-1.5 max-w-xs',
        arrow: 'text-primary',
    }
});

type TooltipVariants = VariantProps<typeof tooltip>;

type TooltipProps = TooltipVariants & BaseTooltipProps;

const Tooltip: FC<TooltipProps> = ({
    className,
    arrow = true,
    ...props
}) => {
    'use memo'
    const {
        base: rootTooltip,
        arrow: rootArrow,
    } = tooltip();

    return (
        <BaseTooltip
            {...props}
            arrow={arrow}
            slotProps={{
                arrow: { className: rootArrow(), },
                tooltip: {
                    className: rootTooltip({
                        className,
                    }),
                },
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -10,],
                            },
                        },
                    ],
                },
            }}
        />
    );
};

export default memo(Tooltip);
