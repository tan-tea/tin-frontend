'use client'

import {
    memo,
    type FC,
    type ComponentProps,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import type { MotionProps } from 'motion/react';

import BaseBox, {
    type BoxProps as BaseBoxProps
} from '@mui/material/Box';

const box = tv({
    base: '',
});

type BoxVariants = VariantProps<typeof box>;

type BoxProps = ComponentProps<typeof BaseBox>
& BaseBoxProps
& BoxVariants
& MotionProps;

const Box: FC<BoxProps> = ({
    className,
    ...props
}) => {
    'use memo'
    return (
        <BaseBox
            {...props}
            data-slot='box'
            className={box({
                className,
            })}
        />
    );
};

export default memo(Box);
