'use client'

import type {
    FC,
    ComponentProps,
} from 'react';
import { motion } from 'motion/react';
import {
    tv,
    type ClassValue,
    type VariantProps,
} from 'tailwind-variants';
import { Field as BaseField, } from '@base-ui/react/field';

import { cn } from 'lib/utils';

import Input from 'ui/field/input';

const field = tv({
    slots: {
        root: cn(
            'border border-dark-600 ring ring-dark-600 py-1.5 px-4 rounded-lg',
            'data-[focused]:ring-[var(--mui-palette-primary-main)] data-[focused]:border-[var(--mui-palette-primary-main)]',
            'dark:border-light-600 dark:ring-light-600'
        ),
        control: cn('dark:text-light-600'),
        label: cn(
            'text-sm leading-4 font-medium',
            'data-[focused]:text-[var(--mui-palette-primary-main)]',
            'dark:text-light-600'
        ),
        error: cn(''),
    },
    variants: {
        color: {
            primary: {
                root: cn('border-primary'),
            },
        },
    },
    defaultVariants: {},
    compoundVariants: [],
});

type FieldVariants = VariantProps<typeof field>;

type FieldProps = ComponentProps<typeof BaseField.Root> & FieldVariants;

export const Field: FC<FieldProps> = ({
    color,
    disabled,
    ...props
}) => {
    'use memo'
    const { root } = field({
        color,
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

type FieldControlProps = ComponentProps<typeof BaseField.Control>
& ComponentProps<typeof Input>
& FieldVariants;

export const FieldControl: FC<FieldControlProps> = ({ ...props }) => {
    'use memo'
    const { control } = field({ ...props });

    return (
        <BaseField.Control
            fullWidth
            render={<Input/>}
            {...props}
            data-slot='field-control'
            className={control()}
        />
    );
}

FieldControl.displayName = 'FieldControl';

type FieldLabelProps = ComponentProps<typeof BaseField.Label>
& FieldVariants;

export const FieldLabel: FC<FieldLabelProps> = ({ ...props }) => {
    'use memo'
    const { label } = field();

    return (
        <BaseField.Label
            {...props}
            data-slot='field-label'
            render={<motion.label/>}
            className={label({
                className: props.className as ClassValue,
            })}
        />
    )
}

type FieldErrorProps = ComponentProps<typeof BaseField.Error>
& FieldVariants;

export const FieldError: FC<FieldErrorProps> = ({ ...props }) => {
    'use memo'
    const { error } = field();

    return (
        <BaseField.Error
            {...error}
            data-slot='field-error'
            className={error({
                className: props.className as ClassValue,
            })}
        />
    );
}
