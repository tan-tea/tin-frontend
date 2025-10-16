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

import {
    Box,
    Text,
    Card,
    CardMedia,
    CardContent,
    CardActionsArea,
} from 'ui/index';

import PriceWithDiscount from 'common/PriceWithDiscount';

const productCard = tv({
    slots: {
        card: 'p-0 overflow-visible bg-transparent dark:text-light-600',
        imageWrapper: 'w-full h-40 object-cover rounded-[inherit] border border-gray-200 bg-light-400 dark:border-none',
    },
});

type ProductCardVariants = VariantProps<typeof productCard>;

type ProductCardProps = Omit<ProductCardVariants, 'hasDiscount'> & {
    id: string;
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
        id,
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

    const {
        card,
        imageWrapper,
    } = productCard();

    const handleClick: MouseEventHandler = () => {};

    return (
        <Card
            shadow='none'
            rounded='xxxl'
            className={card({
                className,
            })}
        >
            <CardActionsArea
                href={`/product/${id}`}
                onClick={handleClick}
            >
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
                        className='text-base font-secondary leading-4.5 font-bold md:text-lg'
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
                    <PriceWithDiscount
                        price={price}
                        discount={discount}
                        className='text-sm'
                    />
                </CardContent>
            </CardActionsArea>
        </Card>
    );
}

export default ProductCard;
