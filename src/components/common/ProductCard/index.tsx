'use client';

import type {
    FC,
    MouseEventHandler,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { useTranslations } from 'next-intl';

import { formatCurrency } from 'lib/utils';

import {
    Box,
    Text,
    Card,
    CardMedia,
    CardContent,
    CardActionsArea,
} from 'ui/index';

const productCard = tv({
    slots: {
        card: 'p-0 overflow-visible bg-transparent dark:text-light-600',
        imageWrapper: 'w-full h-40 object-fill rounded-[inherit] border border-gray-200 bg-light-400 dark:border-none',
        priceValue: 'text-lg text-primary font-bold leading-4 md:text-xl',
    },
    variants: {
        hasDiscount: {
            true: {
                priceValue: 'text-base',
            },
        },
    },
});

type ProductCardVariants = VariantProps<typeof productCard>;

type ProductCardProps = Omit<ProductCardVariants, 'hasDiscount'> & {
    image?: string;
    badge?: string;
    title: string;
    description?: string;
    price: number;
    discount?: number;
    className?: string;
};

const ProductCard: FC<ProductCardProps> = (
    props: ProductCardProps,
) => {
    const {
        badge,
        title,
        description,
        price,
        className,
        discount = 0,
        image = '/next.svg',
    } = props;

    const t = useTranslations('shared');

    const hasDiscount = discount > 0;
    const priceWithDiscount = price * (1 - discount / 100);

    const {
        card,
        priceValue,
        imageWrapper,
    } = productCard({ hasDiscount, });

    const handleClick: MouseEventHandler = () => {};

    return (
        <Card
            shadow='none'
            rounded='xxxl'
            className={card({
                className,
            })}
        >
            <CardActionsArea onClick={handleClick}>
                <CardMedia
                    badge={badge ? badge : hasDiscount ? t('discount', { discount, }) : undefined}
                    component='img'
                    className={imageWrapper()}
                    image={image || '/no-image.svg'}
                />
                <CardContent className='p-2 flex flex-col gap-y-1'>
                    <Text
                        variant='h2'
                        component='h2'
                        className='text-sm font-secondary leading-4.5 font-bold md:text-lg'
                    >
                        {title}
                    </Text>
                    {description && (
                        <Text
                            variant='body1'
                            component='p'
                            className='text-xs leading-4 md:text-base'
                        >
                            {description}
                        </Text>
                    )}
                    <Box className='w-full h-6 flex items-center gap-x-1'>
                        <Text
                            through={hasDiscount}
                            variant='h1'
                            component='h3'
                            className={priceValue()}
                        >
                            {formatCurrency('COP', price)}
                        </Text>
                        {hasDiscount && (
                            <Text
                                variant='h1'
                                component='h3'
                                className={priceValue()}
                            >
                                {formatCurrency('COP', priceWithDiscount)}
                            </Text>
                        )}
                    </Box>
                </CardContent>
            </CardActionsArea>
        </Card>
    );
}

export default ProductCard;
