'use client'

import { FC, } from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';

const spinner = tv({
    base: 'border-[5px] border-white border-b-transparent rounded-full inline-block box-border animate-spin',
    variants: {
        size: {
            small: 'w-4 h-4',
            base: 'w-8 h-8',
            large: 'w-10 h-10',
        },
    },
    defaultVariants: {
        size: 'small',
    },
});

type SpinnerVariants = VariantProps<typeof spinner>;

type SpinnerProps = object & SpinnerVariants;

const Spinner: FC<SpinnerProps> = (props: SpinnerProps) => <span
    className={spinner({ size: props?.size, })}
/>

export default Spinner;
