'use client'

import type {
    FC,
    ComponentProps,
} from 'react';
import type { VariantProps } from 'tailwind-variants';

import { motion } from 'motion/react';
import { tv } from 'tailwind-variants';

import { cn } from 'lib/utils';
import { Link } from 'lib/i18n/navigation';

const link = tv({
    base: cn(''),
});

type LinkVariants = VariantProps<typeof link>;

type LinkProps = LinkVariants
& ComponentProps<typeof Link>;

export const InternalLink: FC<LinkProps> = ({
    className,
    ...props
}) => {
    'use memo'

    return (
        <Link
            prefetch
            {...props}
            data-slot='internal-link'
            className={link({
                className,
            })}
        />
    );
}

export const ExternalLink: FC<LinkProps> = ({
    href,
    rel,
    target,
    children,
    className,
}) => {
    'use memo'

    return (
        <motion.a
            rel={rel}
            target={target}
            href={href.toString()}
            className={link({
                className,
            })}
        >
            {children}
        </motion.a>
    );
}
