'use client'

import {
    memo,
    type FC,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootBox,
    BoxProps as RootBoxProps,
} from '@mui/material/Box';
import type { MotionProps } from 'motion/react';

const box = tv({
    base: '',
});

type BoxVariants = VariantProps<typeof box>;

type BoxProps = object & RootBoxProps & BoxVariants & MotionProps;

const Box: FC<BoxProps> = (props: BoxProps) => {
    const {
        children,
        className,
        ...rest
    } = props;

    return (
        <RootBox
            {...rest}
            className={box({
                className,
            })}
        >
            {children}
        </RootBox>
    );
};

export default memo(Box);
