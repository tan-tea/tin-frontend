'use client'

import {
    useRef,
    type FC,
    type Ref,
    type ChangeEvent,
    type ChangeEventHandler,
} from 'react';
import { motion } from 'motion/react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { Input as BaseInput, } from '@base-ui-components/react/input';

export const input = tv({
    base: 'block box-border focus:outline-none text-base text-[inherit] font-secondary',
    variants: {
        root: '',
        fullWidth: {
            true: 'w-full',
        },
        disabled: {
            true: 'text-dark-400 cursor-not-allowed',
        },
        multiline: {
            true: '',
        },
    },
    defaultVariants: {
        fullWidth: false,
        disabled: false,
    },
});

export type InputVariants = VariantProps<typeof input>;

export type InputProps = InputVariants & BaseInput.Props & {
    ref?: Ref<HTMLInputElement>;
    regExp?: RegExp;
};

const Input: FC<InputProps> = (props: InputProps) => {
    const innerRef = useRef<HTMLInputElement | null>(null);

    const {
        ref = innerRef,
        value,
        className,
        disabled = false,
        required = false,
        fullWidth = false,
        regExp = /^[^$<>{}]*$/,
        onChange,
        ...rest
    } = props;

    const handleChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event?.target?.value || '';

        if (disabled) return;
        if (regExp && newValue && !regExp.test(newValue)) return;

        if (onChange) onChange?.(event as any)
    };

    return (
        <BaseInput
            {...rest}
            ref={ref}
            className={input({
                fullWidth,
                disabled,
                className: typeof className === 'string' ? className : '',
            })}
            render={<motion.input/>}
            value={value}
            disabled={disabled}
            required={required}
            onChange={handleChange}
        />
    );
};

export default Input;
