'use client'

import type { FC, JSX, ComponentProps } from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { motion, MotionProps, MotionNodeAnimationOptions } from 'motion/react';
import { Button as BaseButton } from '@base-ui/react/button';

const baseButton = tv({
    base: [
        'flex',
        'justify-center',
        'items-center',
        'gap-x-2',
        'font-medium',
        'font-secondary',
        'normal-case',
        'box-border',
        'outline-none',
        'select-none',
        'border',
        'whitespace-nowrap',
        'transition-colors',
        'cursor-pointer',
    ],
    variants: {
        color: {
            primary: [
                'border-[var(--mui-palette-primary-main)]',
                'text-[var(--mui-palette-primary-main)]',
                'bg-[var(--mui-palette-primary-main)] hover:bg-[var(--mui-palette-primary-700)]',
            ],
            secondary: [
                'border-[var(--mui-palette-primary-main)]',
                'text-[var(--mui-palette-secondary-main)]',
                'bg-[var(--mui-palette-secondary-main)] hover:bg-[var(--mui-palette-secondary-700)]'
            ],
            default: [
                'border-dark-600 hover:border-dark-300 dark:border-light-400',
                'text-dark-600 hover:text-dark-300 dark:text-light-400',
                'bg-dark-600 hover:bg-dark-300 dark:bg-light-400',
            ],
            none: [
                'text-dark-600 dark:text-light-400',
                'border-none bg-transparent',
            ],
            background: [
                'bg-light-400 dark:bg-dark-600',
                'text-dark-600 dark:text-light-400'
            ],
        },
        rounded: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            full: 'rounded-full',
        },
        block: {
            true: 'size-full',
            flase: 'size-auto',
        },
        size: {
            none: 'p-0 text-base',
            sm: 'px-4 py-1 text-sm',
            md: 'px-6 py-2.5 text-base',
            lg: 'px-8 py-2.5 text-lg',
            icon: 'p-2 text-[length:inherit]'
        },
        variant: {
            filled: 'data-[disabled]:bg-gray-200',
            outline: 'data-[disabled]:border-gray-200 data-[disabled]:text-gray-200',
            text: 'data-[disabled]:text-gray-200',
        },
    },
    defaultVariants: {
        color: 'primary',
        rounded: 'full',
        size: 'md',
        variant: 'filled',
        block: true,
    },
    compoundVariants: [
        {
            color: ['primary', 'secondary', 'default', 'background'],
            variant: 'filled',
            className: [
                'text-[color:inherit] border-transparent',
            ],
        },
        {
            color: ['primary', 'secondary', 'default', 'background'],
            variant: 'outline',
            className: [
                'bg-transparent border',
            ],
        },
        {
            color: ['primary', 'secondary', 'default', 'background'],
            variant: 'text',
            className: [
                'border-none',
            ],
        },
        {
            size: ['sm', 'md', 'lg'],
            variant: 'text',
            className: 'font-semibold'
        }
    ],
});

type BaseButtonVariants = VariantProps<typeof baseButton>;

type ButtonRootProps = BaseButtonVariants
    & MotionProps
    & ComponentProps<typeof BaseButton>;

const BUTTON_ROOT_ANIMATION: MotionNodeAnimationOptions = {
    initial: {
        // scale: 0.90,
    },
    animate: {
        // scale: 1,
    },
    transition: {
        // scale: {
        //     type: 'spring',
        //     duration: 0.25,
        // },
    },
} as const;

const Button: FC<ButtonRootProps> = ({
    className,
    color,
    rounded,
    variant,
    size,
    block,
    ...props
}) => {
    'use memo'

    return (
        <BaseButton
            {...BUTTON_ROOT_ANIMATION}
            {...props}
            data-slot='button-root'
            className={baseButton({
                color,
                rounded,
                variant,
                size,
                block,
                className: className as ClassValue,
            })}
            render={<motion.button/>}
        />
    );
};

Button.displayName = 'Button';

type TriggerButtonProps = Omit<
    ComponentProps<typeof Button>,
    'size'
    | 'variant'
    | 'color'
    | 'rounded'
    | 'block'
>;

const TriggerButton: FC<TriggerButtonProps> = ({ ...props }) => {
    'use memo'

    return (
        <Button
            size='none'
            variant='text'
            color='none'
            rounded='none'
            block={false}
            {...props}
            data-slot='button-trigger'
        />
    );
};

TriggerButton.displayName = 'TriggerButton';

type IconButtonProps = ComponentProps<typeof Button> & {
    children: JSX.Element;
};

const IconButton: FC<IconButtonProps> = ({
    ...props
}) => {

    return (
        <Button
            size='icon'
            variant='text'
            color='background'
            rounded='full'
            {...props}
            data-slot='button-icon'
        />
    );
};

IconButton.displayName = 'IconButton';

export {
    Button,
    TriggerButton,
    IconButton,
};
