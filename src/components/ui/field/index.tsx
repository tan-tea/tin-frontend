'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { motion } from 'motion/react';
import { tv, cn } from 'tailwind-variants';
import { Field as BaseField, } from '@base-ui/react/field';

import { Input } from 'ui/input';
import { Paragraph } from 'ui/text';

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
        description: '',
        item: '',
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

type FieldProps = FieldVariants
    & ComponentProps<typeof BaseField.Root>
    & ComponentProps<typeof motion.div>;

const Field: FC<FieldProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { root } = field({ ...props });

    return (
        <BaseField.Root
            {...props}
            data-slot='field'
            className={root({
                className,
            })}
            render={<motion.div/>}
        />
    );
}

Field.displayName = 'Field';

type FieldControlProps = FieldVariants
    & ComponentProps<typeof BaseField.Control>
    & ComponentProps<typeof Input>

const FieldControl: FC<FieldControlProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { control } = field({ ...props });

    return (
        <BaseField.Control
            fullWidth
            render={<Input/>}
            {...props}
            data-slot='field-control'
            className={control({
                className,
            })}
        />
    );
}

FieldControl.displayName = 'FieldControl';

type FieldLabelProps =  FieldVariants
    & ComponentProps<typeof BaseField.Label>
    & ComponentProps<typeof motion.label>;

const FieldLabel: FC<FieldLabelProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { label } = field({ ...props });

    return (
        <BaseField.Label
            {...props}
            data-slot='field-label'
            className={label({
                className,
            })}
            render={<motion.label/>}
        />
    );
}

FieldLabel.displayName = 'FieldLabel';

type FieldErrorProps = FieldVariants
    & ComponentProps<typeof BaseField.Error>
    & ComponentProps<typeof motion.div>;

const FieldError: FC<FieldErrorProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { error } = field({ ...props });

    return (
        <BaseField.Error
            {...props}
            data-slot='field-error'
            className={error({
                className,
            })}
            render={<motion.div/>}
        />
    );
}

FieldError.displayName = 'FieldError';

type FieldDescriptionProps = FieldVariants
    & ComponentProps<typeof BaseField.Description>
    & ComponentProps<typeof Paragraph>;

const FieldDescription: FC<FieldDescriptionProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { description } = field({ ...props });

    return (
        <BaseField.Description
            {...props}
            data-slot='field-description'
            className={description({
                className,
            })}
            render={<Paragraph/>}
        />
    );
}

FieldDescription.displayName = 'FieldDescription';

type FieldItemProps = FieldVariants
    & ComponentProps<typeof BaseField.Item>
    & ComponentProps<typeof motion.div>;

const FieldItem: FC<FieldItemProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { item } = field({ ...props });

    return (
        <BaseField.Item
            {...props}
            data-slot='field-item'
            className={item({
                className,
            })}
            render={<motion.div/>}
        />
    );
}

FieldItem.displayName = 'FieldItem';

type FieldValidityProps = FieldVariants & ComponentProps<typeof BaseField.Validity>

const FieldValidity: FC<FieldValidityProps> = ({ ...props }) => {
    'use memo'
    return (
        <BaseField.Validity
            {...props}
            data-slot='field-vailidity'
        />
    );
}

FieldValidity.displayName = 'FieldValidity';

export {
    Field,
    FieldControl,
    FieldLabel,
    FieldError,
    FieldDescription,
    FieldItem,
    FieldValidity,
}
