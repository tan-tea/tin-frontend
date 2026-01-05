'use client'

import type { FC, ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import Image from 'next/image';

import { tv, cn } from 'tailwind-variants';
import { motion } from 'motion/react';
import {
    Card as BaseCard,
    Collapse as BaseCollapse,
    CardMedia as BaseCardMedia,
    CardHeader as BaseCardHeader,
    CardActions as BaseCardAcions,
    CardContent as BaseCardContent,
    CardActionArea as BaseCardActionArea,
} from '@mui/material';

import { InternalLink } from 'ui/link';

const card = tv({
    slots: {
        root: cn(
            'size-full shadow-none',
            'md:max-h-screen',
        ),
        media: cn('w-full relative rounded-[inherit]'),
        mediaImage: cn('size-full rounded-[inherit]'),
        header: cn('font-bold text-lg text-center text-dark-600 dark:text-light-600'),
        actions: cn('px-4 py-4 border-t border-t-light-600 dark:border-t-dark-400'),
        content: cn('flex-1 shrink-0 h-full'),
        actionsArea: cn('size-full rounded-[inherit]'),
        collapse: cn(),
    },
    variants: {
        rounded: {
            none: { root: 'rounded-none' },
            sm: { root: 'rounded-sm' },
            md: { root: 'rounded-md' },
            lg: { root: 'rounded-lg' },
            xl: { root: 'rounded-xl' },
            xxl: { root: 'rounded-2xl' },
            xxxl: { root: 'rounded-3xl' },
            full: { root: 'rounded-full' },
        },
        shadow: {
            none: 'shadow-none',
            sm: 'shadow-sm',
        },
    },
    defaultVariants: {
        shadow: 'sm',
        view: 'list',
        rounded: 'md',
    },
});

type CardVariants = VariantProps<typeof card>;

type CardRootProps = ComponentProps<typeof BaseCard>
& CardVariants;

export const CardRoot: FC<CardRootProps> = ({
    rounded,
    className,
    ...props
}) => {
    'use memo'
    const { root } = card();

    return (
        <BaseCard
            {...props}
            data-slot='card-root'
            className={root({
                rounded,
                className,
            })}
        />
    );
}

type CardMediaProps = ComponentProps<typeof BaseCardMedia>
& CardVariants
& {
    alt?: string;
}

export const CardMedia: FC<CardMediaProps> = ({
    alt,
    children,
    className,
    ...props
}) => {
    'use memo'
    const { media } = card();

    return (
        <BaseCardMedia
            component='figure'
            role='banner'
            {...props}
            data-slot='card-media'
            className={media({
                className,
            })}
        >
            {children}
            {alt && (
                <motion.figcaption className='sr-only'>
                    {alt}
                </motion.figcaption>
            )}
        </BaseCardMedia>
    );
}

type CardMediaImageProps = CardVariants & ComponentProps<typeof Image>

export const CardMediaImage: FC<CardMediaImageProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { mediaImage } = card();

    return (
        <Image
            {...props}
            data-slot='card-media-image'
            className={mediaImage({
                className,
            })}
        />
    );
}

type CardHeaderProps = ComponentProps<typeof BaseCardHeader>
& CardVariants;

export const CardHeader: FC<CardHeaderProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { header } = card();

    return (
        <BaseCardHeader
            {...props}
            data-slot='card-header'
            slotProps={{
                title: {
                    className: header({
                        className,
                    }),
                }
            }}
        />
    );
}

type CardContentProps = ComponentProps<typeof BaseCardContent>
& CardVariants;

export const CardContent: FC<CardContentProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { content } = card();

    return (
        <BaseCardContent
            {...props}
            data-slot='card-content'
            className={content({
                className,
            })}
        />
    );
}

type CardActionsProps = ComponentProps<typeof BaseCardAcions>
& CardVariants;

export const CardActions: FC<CardActionsProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { actions } = card();

    return (
        <BaseCardAcions
            {...props}
            data-slot='card-actions'
            className={actions({
                className,
            })}
        />
    );
}

type CardActionsAreaProps = ComponentProps<typeof BaseCardActionArea>
& ComponentProps<typeof InternalLink>
& CardVariants;

export const CardActionsArea: FC<CardActionsAreaProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { actionsArea } = card();

    return (
        <BaseCardActionArea
            {...props}
            LinkComponent={InternalLink}
            data-slot='card-actions-area'
            className={actionsArea({
                className,
            })}
        />
    );
}

type CardCollapseProps = ComponentProps<typeof BaseCollapse>
& CardVariants;

export const CardCollapse: FC<CardCollapseProps> = ({
    className,
    ...props
}) => {
    'use memo'
    const { collapse } = card();

    return (
        <BaseCollapse
            {...props}
            data-slot='card-collapse'
            className={collapse({
                className,
            })}
        />
    );
}
