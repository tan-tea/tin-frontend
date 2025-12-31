'use client'

import type {
    FC,
    Ref,
    MouseEvent,
    KeyboardEvent,
    ComponentProps,
} from 'react';
import type { VariantProps, ClassValue } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { motion, MotionProps, MotionNodeAnimationOptions } from 'motion/react';
import { Button as BaseButton } from '@base-ui/react/button';

import {
    default as RootButton,
    ButtonProps as RootButtonProps,
} from '@mui/material/Button';

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
        },
        variant: {
            filled: 'data-[disabled]:bg-gray-200',
            outline: '',
            text: '',
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
            color: ['primary', 'secondary', 'default'],
            variant: 'filled',
            className: [
                'text-[color:inherit] border-transparent',
            ],
        },
        {
            color: ['primary', 'secondary', 'default'],
            variant: 'outline',
            className: [
                'bg-transparent border',
            ],
        },
        {
            color: ['primary', 'secondary', 'default'],
            variant: 'text',
            className: [
                'bg-transparent border-transparent',
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
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
    transition: {
        opacity: {
            type: 'spring',
            duration: 0.25,
        },
    },
} as const;

const ButtonRoot: FC<ButtonRootProps> = ({
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

ButtonRoot.displayName = 'ButtonRoot';

type TriggerButtonProps = Omit<
    ComponentProps<typeof ButtonRoot>,
    'size'
    | 'variant'
    | 'color'
    | 'rounded'
    | 'block'
>;

const TriggerButton: FC<TriggerButtonProps> = ({ ...props }) => {
    'use memo'

    return (
        <ButtonRoot
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

export {
    ButtonRoot,
    TriggerButton,
};

const button = tv({
    base: 'normal-case rounded-lg',
    variants: {
        color: {
            primary: 'bg-primary text-white border-white',
            secondary: 'bg-secondary text-white',
        },
        rounded: {
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            xxl: 'rounded-2xl',
            full: 'rounded-full',
        },
        mobile: {
            true: 'py-3 text-sm',
        },
        selected: {
            true: '',
        }
    },
    defaultVariants: {
        rounded: 'md',
        selected: false,
    }
});

type ButtonVariants = BaseButtonVariants & VariantProps<typeof button>;

type ButtonProps = ButtonVariants & ComponentProps<'button'> & MotionNodeAnimationOptions & {
    block?: boolean;
    loading?: boolean;
    allowEnter?: boolean;
    children: RootButtonProps['children'];
    size?: RootButtonProps['size'];
    startIcon?: RootButtonProps['startIcon'];
    endIcon?: RootButtonProps['endIcon'];
    color?: RootButtonProps['color'];
    variant?: RootButtonProps['variant'];
    disableRipple?: RootButtonProps['disableRipple'];
    component?: RootButtonProps['component'];
    ref?: Ref<HTMLButtonElement>;
};

const Button: FC<ButtonProps> = (props) => {
    const {
        ref,
        children,
        size,
        selected,
        className,
        startIcon,
        endIcon,
        mobile,
        rounded,
        disableRipple,
        color = 'primary',
        variant = 'outlined',
        tabIndex = 0,
        block = false,
        loading = false,
        allowEnter = false,
        disabled = false,
        onClick,
        onKeyDown,
        ...rest
    } = props;

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (allowEnter && onClick && event?.key === 'Enter') {
            event?.preventDefault();
            onClick?.({ ...event, } as unknown as MouseEvent<HTMLButtonElement>);
        }
    };

    return (
        <RootButton
            {...rest}
            // component={motion.button}
            className={button({
                mobile,
                rounded,
                className,
                ...(selected && {
                    color,
                }),
            })}
            ref={ref}
            size={size}
            variant={variant}
            color={color}
            fullWidth={block}
            tabIndex={tabIndex}
            disabled={disabled}
            disableRipple={disableRipple}
            onClick={onClick}
            onKeyDown={(event) => {
                if (onKeyDown) onKeyDown?.(event);
                handleKeyDown(event);
            }}
            startIcon={startIcon}
            endIcon={endIcon}
        >
            {loading && <>Loading...</>}
            {!loading && children}
        </RootButton>
    );
};

export default Button;
