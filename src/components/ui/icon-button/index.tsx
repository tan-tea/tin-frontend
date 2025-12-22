'use client';

import type {
    FC,
    ReactNode,
    RefCallback,
    ComponentProps,
} from 'react';
import { useRef } from 'react';
import { motion, } from 'motion/react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';

import { Icon } from 'components/icons';

const iconButton = tv({
    base: 'size-auto relative flex items-center justify-center border rounded-lg cursor-pointer outline-none',
    variants: {
        size: {
            sm: 'p-0.5',
            md: 'p-1',
            lg: 'p-2',
        },
        color: {
            root: '',
            primary: 'border-[var(--mui-palette-primary-main)] text-[var(--mui-palette-primary-main)] fill-[var(--mui-palette-primary-main)]'
        },
        rounded: {
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            full: 'rounded-full',
        },
        iconSize: {
            sm: 'size-5',
            md: 'size-6',
            lg: 'size-7',
        },
        selected: {
            true: 'text-[var(--mui-palette-primary-main)]',
            false: 'text-dark-600 dark:text-light-600',
        },
        borderless: {
            true: 'border-none'
        },
    },
    compoundVariants: [
        {
            selected: true,
            className: 'text-[var(--mui-palette-primary-main)]',
        },
        {
            selected: false,
            className: 'text-dark-600 dark:text-light-400'
        }
    ],
});

type IconButtonVariants = VariantProps<typeof iconButton>;

type IconButtonProps = IconButtonVariants
& ComponentProps<typeof motion.button>
& {
    icon?: ComponentProps<typeof Icon>['value'];
    children?: ReactNode;
};

const IconButton: FC<IconButtonProps> = ({
    ref,
    icon,
    className,
    size = 'lg',
    color = 'root',
    rounded = 'xl',
    iconSize = 'md',
    selected = false,
    borderless = false,
    children = null,
    ...rest
}) => {
    'use memo'
    const innerRef = useRef<HTMLButtonElement | null>(null);

    const refCallback: RefCallback<HTMLButtonElement> = (node) => {
        innerRef.current = node;

        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node;
    }

    return (
        <motion.button
            whileTap={{ scale: 0.95, }}
            whileHover={{ scale: 1.05 }}
            {...rest}
            ref={refCallback}
            className={iconButton({
                size,
                color,
                rounded,
                selected,
                className,
                borderless,
            })}
        >
            {icon && (
                <Icon
                    value={icon}
                    selected={selected}
                />
            )}
            {children && children}
        </motion.button>
    );
};

export default IconButton;
