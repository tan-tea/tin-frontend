'use client';

import type { FC, ComponentProps, ReactNode } from 'react';

import {
    useContext,
    createContext
} from 'react';
import { motion } from 'motion/react';
import {
    tv,
    type VariantProps
} from 'tailwind-variants';
import { Slot } from '@radix-ui/react-slot';

import { cn } from 'lib/utils';

import { Slash, MoreHorizontal } from 'components/icons';

const breadcrumb = tv({
    slots: {
        root: cn(),
        list: cn('text-muted-foreground flex flex-wrap items-center gap-1.5 text-xs break-words sm:gap-2.5'),
        item: cn('inline-flex items-center gap-1.5'),
        link: cn('transition-colors'),
        page: cn('font-normal text-[length:inherit] text-[var(--mui-palette-primary-main)]'),
        separator: cn('[&>svg]:size-3.5'),
        ellipsis: cn('flex size-9 items-center justify-center'),
    },
    variants: {},
});

type BreadcrumbVariants = VariantProps<typeof breadcrumb>;

type BreadcrumbProps = BreadcrumbVariants & ComponentProps<typeof motion.nav>;

const Breadcrumb: FC<BreadcrumbProps> = ({ className, ...props }) => {
    'use memo'
    const { root } = breadcrumb();

    return (
        <motion.nav
            {...props}
            aria-label='breadcrumb'
            data-slot='breadcrumb'
            className={root({
                className,
            })}
        />
    );
};

type BreadcrumbListProps = BreadcrumbVariants & ComponentProps<typeof motion.ol>;

const BreadcrumbList: FC<BreadcrumbListProps> = ({ className, ...props }) => {
    'use memo'
    const { list } = breadcrumb();

    return (
        <motion.ol
            {...props}
            data-slot='breadcrumb-list'
            className={list({
                className,
            })}
        />
    );
}

type BreadcrumbItemProps = BreadcrumbVariants & ComponentProps<typeof motion.li>;

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({ className, ...props }) => {
    'use memo'
    const { item } = breadcrumb();

    return (
        <motion.li
            {...props}
            data-slot='breadcrumb-item'
            className={item({
                className,
            })}
        />
    );
}

type BreadcrumbLinkProps = BreadcrumbVariants & ComponentProps<typeof Slot> & {
    asChild?: boolean;
};

const BreadcrumbLink: FC<BreadcrumbLinkProps> = ({
    asChild,
    className,
    ...props
}) => {
    'use memo'
    const { link } = breadcrumb();

    return (
        <Slot
            {...props}
            data-slot='breadcrumb-link'
            className={link({
                className,
            })}
        />
    );
}

type BreadcrumbPageProps = BreadcrumbVariants & ComponentProps<typeof motion.span>;

const BreadcrumbPage: FC<BreadcrumbPageProps> = ({ className, ...props }) => {
    'use memo'
    const { page } = breadcrumb();

    return (
        <motion.span
            {...props}
            data-slot='breadcrumb-page'
            role='link'
            aria-disabled='true'
            aria-current='page'
            className={page({
                className,
            })}
        />
    );
}

type BreadcrumbSeparatorProps = BreadcrumbVariants & ComponentProps<typeof motion.li>;

const BreadcrumbSeparator: FC<BreadcrumbSeparatorProps> = ({ children, className, ...props }) => {
    'use memo'
    const { separator } = breadcrumb();

    return (
        <motion.li
            {...props}
            data-slot='breadcrumb-separator'
            role='presentation'
            aria-hidden='true'
            className={separator({
                className,
            })}
        >
            {children ?? <Slash/>}
        </motion.li>
    );
}

type BreadcrumbEllipsisProps = BreadcrumbVariants & ComponentProps<typeof motion.span>;

const BreadcrumbEllipsis: FC<BreadcrumbEllipsisProps> = ({ className, ...props }) => {
    'use memo'
    const { ellipsis } = breadcrumb();

    return (
        <motion.span
            {...props}
            data-slot='breadcrumb-ellipsis'
            role='presentation'
            aria-hidden='true'
            className={ellipsis({
                className,
            })}
        >
            <MoreHorizontal className='size-4'/>
            <span className='sr-only'>More</span>
        </motion.span>
    );
}

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
