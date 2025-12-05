'use client'

import type {
    FC,
    ComponentProps
} from 'react';
import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';
import { motion } from 'motion/react';

import { cn } from 'lib/utils';

import {
    ExternalLink,
    InternalLink,
} from 'ui/link';
import {
    Icon,
    ChevronRight,
} from 'icons/index';

const menuItem = tv({
    slots: {
        root: '',
        icon: '',
        label: '',
    },
    variants: {},
});

type MenuItemVariants = VariantProps<typeof menuItem>;

type MenuItemProps = MenuItemVariants & {
    href: string;
    label: string;
    icon: ComponentProps<typeof Icon>['value'];
    isExternal?: boolean;
};

const MenuItem: FC<MenuItemProps> = ({
    icon,
    label,
    isExternal = false,
    ...props
}) => {
    'use memo'
    const {
        root,
        icon: iconSlot,
        label: labelSlot,
    } = menuItem();

    const Wrapper = isExternal
        ? ExternalLink
        : InternalLink;

    return (
        <Wrapper
            {...props}
            className={cn(
                'w-full flex items-center px-6 py-4 gap-x-4 rounded-2xl',
                'bg-light-400 dark:bg-dark-400'
            )}
        >
            <Icon value={icon} className={cn('')}/>
            <motion.span className={cn('text-base')}>
                {label}
            </motion.span>
            <Icon value={ChevronRight} className={cn('ml-auto')}/>
        </Wrapper>
    );
}

export default MenuItem;
