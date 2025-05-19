'use client'

import {
    FC,
    memo,
} from 'react';

import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootTooltip,
    TooltipProps as RootTooltipProps,
} from '@mui/material/Tooltip';

const tooltip = tv({
    slots: {
        base: 'text-xs font-primary rounded-sm shadow-sm bg-primary px-4 py-1.5 max-w-xs',
        arrow: 'text-primary',
    }
});

const {
    base: rootTooltip,
    arrow: rootArrow,
} = tooltip();

type TooltipVariants = VariantProps<typeof tooltip>;

type TooltipProps = TooltipVariants & RootTooltipProps;

const Tooltip: FC<TooltipProps> = (props: TooltipProps) => {
    const {
        children,
        className,
        arrow = true,
        ...rest
    } = props;

    return (
        <RootTooltip
            {...rest}
            arrow={arrow}
            children={children}
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
