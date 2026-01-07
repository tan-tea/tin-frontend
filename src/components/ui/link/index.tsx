'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { motion } from 'motion/react';
import { tv, cn } from 'tailwind-variants';

import { Link as BaseLink } from 'lib/i18n/navigation';

const link = tv({
    base: cn('text-dark-600 dark:text-light-400 hover:text-[var(--mui-palette-primary-main)]'),
});

type LinkVariants = VariantProps<typeof link>;

type LinkProps = LinkVariants & ComponentProps<typeof BaseLink>;

const InternalLink: FC<LinkProps> = ({
    className,
    ...props
}) => {
    'use memo'

    return (
        <BaseLink
            prefetch
            {...props}
            data-slot='internal-link'
            className={link({
                className,
            })}
        />
    );
};

InternalLink.displayName = 'InternalLink';

const ExternalLink: FC<LinkProps> = ({
    href,
    children,
    className,
    ...props
}) => {
    'use memo'

    return (
        <motion.a
            rel='noopener noreferrer'
            target='_blank'
            {...props as any}
            href={href.toString()}
            className={link({
                className,
            })}
        >
            {children}
        </motion.a>
    );
};

ExternalLink.displayName = 'ExternalLink';

export {
    InternalLink,
    ExternalLink,
};
