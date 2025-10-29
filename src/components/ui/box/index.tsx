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
    default as RootBox,
    BoxProps as RootBoxProps,
} from '@mui/material/Box';
import { MotionProps } from 'motion/react';

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
            children={children}
            className={box({
                className,
            })}
        />
    );
};

export default memo(Box);
