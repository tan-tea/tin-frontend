'use client'

import type {
    FC,
    Ref,
    MouseEvent,
    KeyboardEvent,
    ComponentProps,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootButton,
    ButtonProps as RootButtonProps,
} from '@mui/material/Button';

import { Spinner, } from 'ui/index';

const button = tv({
    base: 'normal-case rounded-lg',
    variants: {
        color: {
            primary: 'bg-primary text-white border-white',
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

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ButtonVariants & ComponentProps<'button'> & {
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
    ref?: Ref<HTMLButtonElement>;
};

const Button: FC<ButtonProps> = (props: ButtonProps) => {
    const {
        ref,
        children,
        size,
        selected,
        className,
        startIcon,
        endIcon,
        mobile,
        color = 'primary',
        variant = 'outlined',
        tabIndex = 0,
        block = false,
        loading = false,
        allowEnter = false,
        disabled = false,
        rounded,
        disableRipple,
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
            {loading && <Spinner/>}
            {!loading && children}
        </RootButton>
    );
};

export default Button;
