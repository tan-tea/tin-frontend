'use client'

import type { FC, ComponentProps } from 'react';

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

type NavigationDrawerListItemProps = {
    href: string;
    label: string;
    icon: ComponentProps<typeof Icon>['value'];
    isExternal?: boolean;
};

const NavigationDrawerListItem: FC<NavigationDrawerListItemProps> = ({
    icon,
    label,
    isExternal = false,
    href,
}) => {
    'use memo'
    const Wrapper = isExternal
        ? ExternalLink
        : InternalLink;

    return (
        <Wrapper
            // {...props}
            href={href as any}
            className={cn(
                'w-full flex items-center px-6 py-4 gap-x-4 rounded-xl',
                'bg-light-600 dark:bg-dark-300'
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

export default NavigationDrawerListItem;
