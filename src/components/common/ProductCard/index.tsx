'use client';

import type {
    FC,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { useTranslations } from 'next-intl';

import { cn } from 'lib/utils';

import type {
    Offer
} from 'shared/models';
import { useCountdown, usePrefetch } from 'shared/hooks';

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
        card: cn(
            'p-0 h-full flex overflow-visible shadow-xs bg-transparent border border-[var(--mui-palette-grey-50)]',
            'dark:text-light-400 dark:border-dark-300 dark:bg-dark-400'
        ),
        imageWrapper: cn('w-full h-40 object-cover rounded-[inherit] bg-transparent border-none'),
        cardContent: cn('flex-1 px-2.5 pb-4 pt-2 flex flex-col justify-between gap-y-1'),
    },
});

type ProductCardVariants = VariantProps<typeof productCard>;

type ProductCardProps = Omit<ProductCardVariants, 'hasDiscount'> & {
    offer: Offer;
    image?: string;
    badge?: string;
    className?: string;
    showDescription?: boolean;
    showDiscountTimeLeft?: boolean;
};

const ProductCard: FC<ProductCardProps> = ({
    offer,
    badge,
    className,
    showDescription = false,
    showDiscountTimeLeft = false,
}) => {
    'use memo'
    const {
        id,
        title,
        description,
        price,
        banner: image,
        discount,
        endDate,
    } = offer;

    const {
        card,
        imageWrapper,
        cardContent,
    } = productCard();

    const timeLeft = useCountdown({
        date: endDate,
    });

    const {
        prefetchRoute,
    } = usePrefetch();

    const t = useTranslations();

    const hasDiscount = discount > 0;

    const target = `/product/${id}`;

    return (
        <Card
            shadow='none'
            rounded='xxxl'
            className={card({
                className,
            })}
        >
            <CardActionsArea
                className='h-full'
                href={target}
                onMouseEnter={() => prefetchRoute(target)}
                onTouchStart={() => prefetchRoute(target)}
            >
                <CardMedia
                    badge={badge
                        ? badge
                        : hasDiscount
                            ? t('shared.discount', { discount: Math.round(discount), })
                            : undefined
                    }
                    component='img'
                    className={imageWrapper()}
                    image={image || '/images/blank.svg'}
                />
                <CardContent className={cardContent()}>
                    <Box className={cn(
                        'flex flex-col gap-y-0',
                        showDiscountTimeLeft && 'mb-2'
                    )}>
                        <Text
                            variant='h2'
                            component='h2'
                            className='text-base font-nunito leading-4.5 font-bold md:text-lg truncate'
                        >
                            {title}
                        </Text>
                        {timeLeft && showDiscountTimeLeft && (
                            <Text className='text-xs leading-4 text-dark-300/75 dark:text-light-600'>
                                {t('discountTimeLeft', { left: timeLeft })}
                            </Text>
                        )}
                    </Box>
                    {description && showDescription && (
                        <Text
                            variant='body1'
                            component='p'
                            className='text-sm leading-4 md:text-base'
                        >
                            {description}
                        </Text>
                    )}
                    <PriceWithDiscount
                        orientation='horizontal'
                        price={price}
                        discount={discount}
                        className='mt-auto'
                    />
                </CardContent>
            </CardActionsArea>
        </Card>
    );
}

export default ProductCard;
