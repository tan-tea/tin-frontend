'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { createContext, useContext } from 'react';
import { motion } from 'motion/react';
import { tv, cn } from 'tailwind-variants';
import { Field as BaseField, } from '@base-ui/react/field';

import { Input } from 'ui/input';
import { Paragraph } from 'ui/text';

const field = tv({
    slots: {
        root: cn(
            'w-full outline-none',
            'dark:border-light-600 dark:ring-light-600'
        ),
        control: cn('dark:text-light-600'),
        label: cn(
            'text-sm leading-4 font-medium',
            'dark:text-light-600'
        ),
        error: cn(''),
        description: '',
        item: '',
    },
    variants: {
        color: {
            primary: {
                root: cn('border-primary data-[focused]:border-[var(--mui-palette-primary-main)] data-[focused]:ring-[var(--mui-palette-primary-main)]'),
                control: 'data-[focused]:border-[var(--mui-palette-primary-main)] data-[focused]:ring-[var(--mui-palette-primary-main)]',
                label: 'data-[focused]:text-[var(--mui-palette-primary-main)]',
            },
        },
        variant: {
            normal: {},
            outline: {
                root: 'flex flex-col px-4 py-2 border ring rounded-xl border-neutral-600 ring-neutral-200',
                control: '',
                label: 'text-neutral-600',
            },
            external: {
                root: 'flex flex-col gap-y-2',
                control: 'border rounded-lg px-4 py-2.5',
                label: '',
            }
        }
    },
    defaultVariants: {
        variant: 'normal',
        color: 'primary',
    },
    compoundVariants: [],
});

type FieldVariants = VariantProps<typeof field>;

type FieldContextProps = FieldVariants;

const FieldContext = createContext<FieldContextProps>({
    color: 'primary',
    variant: 'normal',
});

function useField() {
    const context = useContext(FieldContext);
    if (!context) throw new Error('Field subcomponents must be used inside field');

    return context;
}

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
        <FieldContext.Provider value={{...props}}>
            <BaseField.Root
                {...props}
                data-slot='field'
                className={root({
                    className,
                })}
                render={<motion.div/>}
            />
        </FieldContext.Provider>
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

    const {
        color: fieldColor,
        variant: fieldVariant,
    } = useField();

    const color = fieldColor ?? props.color;
    const variant = fieldVariant ?? props.variant;

    return (
        <BaseField.Control
            fullWidth
            render={<Input/>}
            {...props}
            data-slot='field-control'
            className={control({
                className,
                variant,
                color,
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

    const {
        color: fieldColor,
        variant: fieldVariant,
    } = useField();

    const color = fieldColor ?? props.color;
    const variant = fieldVariant ?? props.variant;

    return (
        <BaseField.Label
            {...props}
            data-slot='field-label'
            className={label({
                className,
                color,
                variant,
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

    const {
        color: fieldColor,
        variant: fieldVariant,
    } = useField();

    const color = fieldColor ?? props.color;
    const variant = fieldVariant ?? props.variant;

    return (
        <BaseField.Error
            {...props}
            data-slot='field-error'
            className={error({
                className,
                color,
                variant,
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

    const {
        color: fieldColor,
        variant: fieldVariant,
    } = useField();

    const color = fieldColor ?? props.color;
    const variant = fieldVariant ?? props.variant;

    return (
        <BaseField.Description
            {...props}
            data-slot='field-description'
            className={description({
                className,
                color,
                variant,
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

    const {
        color: fieldColor,
        variant: fieldVariant,
    } = useField();

    const color = fieldColor ?? props.color;
    const variant = fieldVariant ?? props.variant;

    return (
        <BaseField.Item
            {...props}
            data-slot='field-item'
            className={item({
                className,
                color,
                variant,
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
