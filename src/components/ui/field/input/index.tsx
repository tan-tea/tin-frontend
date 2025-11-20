'use client'

import {
    useRef,
    type FC,
    type Ref,
    type RefCallback,
    type ChangeEventHandler,
    ComponentProps,
} from 'react';
import { motion } from 'motion/react';
import {
    ClassValue,
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { Input as BaseInput, } from '@base-ui-components/react/input';

const input = tv({
    base: 'block box-border bg-none focus:outline-none text-base text-[inherit] font-secondary',
    variants: {
        fullWidth: {
            true: 'w-full',
            false: 'w-auto',
        },
        disabled: {
            true: 'text-dark-400 cursor-not-allowed',
        },
        multiline: {
            true: '',
        },
    },
    defaultVariants: {
        fullWidth: true,
        disabled: false,
    },
});

type InputVariants = VariantProps<typeof input>;

type InputProps = InputVariants & ComponentProps<typeof BaseInput> & {
    ref?: Ref<HTMLInputElement>;
    regExp?: RegExp;
    className?: ClassValue;
};

const Input: FC<InputProps> = ({
    ref,
    value,
    className,
    disabled = false,
    required = false,
    fullWidth = false,
    regExp = /^[^$<>{}]*$/,
    onChange,
    ...props
}) => {
    'use memo'
    const innerRef = useRef<HTMLInputElement | null>(null);

    const refCallback: RefCallback<HTMLInputElement> = (node) => {
        innerRef.current = node;

        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.RefObject<HTMLInputElement | null>).current = node;
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const newValue = event?.target?.value || '';

        if (disabled) return;
        if (regExp && newValue && !regExp.test(newValue)) return;

        if (onChange) onChange?.(event as any)
    };

    return (
        <BaseInput
            {...props}
            ref={refCallback}
            className={input({
                fullWidth,
                disabled,
                className,
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
