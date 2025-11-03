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
    Text,
    Card,
    CardMedia,
    CardContent,
    CardActionsArea,
} from 'ui/index';

import PriceWithDiscount from 'common/PriceWithDiscount';

const productCard = tv({
    slots: {
        card: 'p-0 overflow-visible bg-transparent dark:text-light-600 border border-[var(--mui-palette-grey-50)] shadow-xs dark:border-none',
        imageWrapper: 'w-full h-40 object-cover rounded-[inherit] bg-white dark:border-none',
        cardContent: 'px-2.5 pb-4 pt-2 flex flex-col gap-y-1',
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
        image,
        discount = 0,
    } = props;

    const t = useTranslations('shared');

    const hasDiscount = discount > 0;

    const {
        card,
        imageWrapper,
        cardContent,
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
                    image={image || '/images/blank.svg'}
                />
                <CardContent className={cardContent()}>
                    <Text
                        variant='h2'
                        component='h2'
                        className='text-base font-nunito leading-4.5 font-bold md:text-lg'
                    >
                        {title}
                    </Text>
                    {description && (
                        <Text
                            variant='body1'
                            component='p'
                            className='hidden text-xs leading-4 md:text-base md:block'
                        >
                            {description}
                        </Text>
                    )}
                    <PriceWithDiscount
                        orientation='horizontal'
                        price={price}
                        discount={discount}
                    />
                </CardContent>
            </CardActionsArea>
        </Card>
    );
}

export default ProductCard;
