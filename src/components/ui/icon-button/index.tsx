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
            primary: 'border-primary text-primary fill-primary'
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
            true: '',
        },
        borderless: {
            true: 'border-none'
        },
    },
    compoundVariants: [
        {
            selected: true,
            className: 'text-primary',
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

const IconButton: FC<IconButtonProps> = (props: IconButtonProps) => {

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

    const childProps: LucideProps = {
        className: `${iconSize} ${selected && 'fill-primary'}`,
        strokeWidth: 2,
        absoluteStrokeWidth: false,
    };

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
            <Icon {...childProps}/>
        </motion.button>
    );
};

export default IconButton;
