'use client';

import type {
    FC,
    ElementType,
} from 'react';
import type { LucideProps, } from 'lucide-react';
import { motion, type HTMLMotionProps } from 'motion/react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { BaseIcon } from 'icons/index';

export const iconButton = tv({
    base: 'size-auto relative flex items-center justify-center border rounded-lg cursor-pointer',
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
            className: 'text-gray-600 dark:text-light-600'
        }
    ],
});

export type IconButtonVariants = VariantProps<typeof iconButton>;

export type IconButtonProps = IconButtonVariants & HTMLMotionProps<'button'> & {
    Icon: ElementType<LucideProps>;
};

const IconButton: FC<IconButtonProps> = (props) => {
    const {
        ref,
        Icon,
        className,
        size = 'lg',
        color = 'root',
        rounded = 'xl',
        iconSize = 'md',
        selected = false,
        borderless = false,
        ...rest
    } = props;

    return (
        <motion.button
            whileTap={{ scale: 0.95, }}
            whileHover={{ scale: 1.05 }}
            {...rest}
            ref={ref}
            className={iconButton({
                size,
                color,
                rounded,
                selected,
                className,
                borderless,
            })}
        >
            <BaseIcon
                Icon={Icon}
                color='primary'
                selected={selected}
            />
        </motion.button>
    );
};

export default IconButton;
