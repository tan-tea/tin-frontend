'use client'

import type { FC, } from 'react';
import { motion } from 'motion/react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import {
    default as RootCardMedia,
    CardMediaProps as RootCardMediaProps,
} from '@mui/material/CardMedia';
import Box from 'ui/box';

const cardMedia = tv({
    base: 'relative rounded-inherit',
});

type CardMediaVariants = VariantProps<typeof cardMedia>;

type CardMediaProps = CardMediaVariants & RootCardMediaProps & {
    badge?: string;
};

const CardMedia: FC<CardMediaProps> = (props: CardMediaProps) => {
    const {
        badge,
        children,
        className,
        ...rest
    } = props;

    return (
        <Box className={`${className} border-none`}>
            {badge && (
                <motion.div className='absolute top-0 right-0 mt-2 mr-2 z-20 bg-primary-light rounded-2xl px-4 py-1 text-sm font-medium leading-4 dark:text-black'>
                    {badge}
                </motion.div>
            )}
            <RootCardMedia
                {...rest}
                className={cardMedia({
                    className,
                })}
            />
        </Box>
    );
};

export default CardMedia;
