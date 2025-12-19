'use client'

import {
    type FC,
} from 'react';
import { motion, } from 'motion/react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { Field as BaseField, } from '@base-ui/react/field';

export const label = tv({
    base: 'text-sm font-medium leading-4 text-gray-400',
    variants: {
        focused: {
            true: 'text-primary',
        },
    },
});

export type LabelVariants = VariantProps<typeof label>;

export type LabelProps = LabelVariants & Omit<BaseField.Label.Props, 'children'> & {
    value: string;
};

const Label: FC<LabelProps> = (props: LabelProps) => {
    const {
        id,
        value,
        focused,
        className,
        ...rest
    } = props;

    return (
        <BaseField.Label
            {...rest}
            id={id}
            className={label({
                focused,
                className: typeof className === 'string' ? className : '',
            })}
            render={<motion.label/>}
        >
            {value}
        </BaseField.Label>
    );
}

export default Label;
