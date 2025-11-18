'use client'

import {
    ComponentProps,
    type FC,
    FocusEvent,
    FocusEventHandler,
    Fragment,
    useState,
} from 'react';
import { motion } from 'motion/react';
import {
    ClassValue,
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { Field as BaseField, } from '@base-ui-components/react/field';

import {
    Input,
    Label,
} from 'ui/index';
import { cn } from 'lib/utils';

const field = tv({
    base: 'box-border flex flex-col px-4 py-2 gap-y-1 border border-gray-400 rounded-md focus:outline-none',
    slots: {
        root: cn(''),
        control: cn(''),
    },
    variants: {
        color: {
            root: '',
            primary: 'border-primary',
        },
        fullWidth: {
            true: 'w-full',
        },
        focused: {
            true: '',
        },
        disabled: {
            true: 'text-dark-400 cursor-not-allowed',
        },
    },
    defaultVariants: {
        color: 'root',
        fullWidth: true,
        disabled: false,
    },
    compoundVariants: [
        {
            focused: true,
            color: 'root',
            class: 'border-primary',
        },
    ],
});

type FieldVariants = VariantProps<typeof field>;

type FieldRootProps = ComponentProps<typeof BaseField.Root> & FieldVariants;

const FieldRoot: FC<FieldRootProps> = ({
    color,
    fullWidth,
    focused,
    disabled,
    ...props
}) => {
    'use memo'
    const { root } = field({
        color,
        fullWidth,
        focused,
        disabled,
    });

    return (
        <BaseField.Root
            {...props}
            data-slot='field'
            className={root({
                className: props.className as ClassValue,
            })}
        />
    );
}

FieldRoot.displayName = 'Field';

type FieldControlProps = ComponentProps<typeof BaseField.Control>
& ComponentProps<typeof Input>
& FieldVariants;

const FieldControl: FC<FieldControlProps> = ({ ...props }) => {
    'use memo'
    const { control } = field({ ...props });

    return (
        <BaseField.Control
            {...props}
            data-slot='field-control'
            render={<Input/>}
            className={control()}
        />
    );
}

FieldControl.displayName = 'FieldControl';

type FieldProps = Omit<ComponentProps<typeof Input>, 'className'> & FieldVariants & Omit<BaseField.Root.Props, 'onChange'> & {
    label?: string;
    labelClassName?: string;
    placeholder?: string;
    inputClassName?: string;
};

const Field: FC<FieldProps> = (props) => {
    const {
        id,
        color,
        label,
        value,
        className,
        placeholder,
        labelClassName,
        inputClassName,
        disabled = false,
        fullWidth = false,
        onChange,
        onFocus,
        onBlur,
        ...rest
    } = props;

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleFocus: FocusEventHandler = (event: FocusEvent) => {
        setIsFocused(true);

        if (onFocus) onFocus?.(event as any);
    }

    const handleBlur: FocusEventHandler = (event: FocusEvent) => {
        setIsFocused(false);

        if (onBlur) onBlur?.(event as any);
    }

    const variants = {
        idle: { opacity: 1, scale: 1, },
        enter: { opacity: 1, y: 0, },
        focused: { scale: 1.01, },
    };

    return (
        <BaseField.Root
            {...rest}
            tabIndex={0}
            // className={field({
            //     color,
            //     fullWidth,
            //     disabled,
            //     focused: isFocused,
            //     className: typeof className === 'string' ? className : '',
            // })}
            render={<motion.div
                initial='enter'
                variants={variants}
                animate={isFocused ? 'focused' : 'idle'}
            />}
            disabled={disabled}
            children={<Fragment>
                {label && <Label
                    htmlFor={id}
                    value={label}
                    focused={isFocused}
                    className={labelClassName}
                />}
                <BaseField.Control
                    {...rest}
                    id={id}
                    value={value ?? ''}
                    disabled={disabled}
                    className={inputClassName}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    render={<Input/>}
                />
            </Fragment>}
        />
    );
};

export {
    FieldRoot,
    FieldControl,
}
export default Field;
