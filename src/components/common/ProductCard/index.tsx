'use client';

import type {
    ComponentProps,
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
import { useCountdown } from 'shared/hooks';

import { Typography } from 'ui/index';
import {
    CardRoot,
    CardMedia,
    CardMediaImage,
    CardHeader,
    CardContent,
    CardActionsArea,
} from 'ui/card';

import ExpandableText from 'common/ExpandableText';
import PriceWithDiscount from 'common/PriceWithDiscount';

const productCard = tv({
    slots: {
        root: cn(
            'flex overflow-visible shadow-xs ring ring-[var(--mui-palette-grey-50)]',
            'dark:text-light-400 dark:ring-[transparent] dark:border-dark-300 dark:bg-dark-400',
        ),
        actionsArea: cn('size-full'),
        media: cn('w-full h-40 border-none'),
        mediaImage: cn('object-cover'),
        content: cn('w-full px-2.5 pb-2.5 pt-2 flex flex-col justify-between gap-y-1'),
        priceWithDiscount: cn('mt-auto'),
        titleText: cn('text-base font-nunito leading-4.5 font-bold md:text-lg'),
        timeleftText: cn('text-xs leading-4 text-dark-300/75 dark:text-light-600'),
        descriptionText: cn('text-xs leading-4'),
    },
    variants: {
        variant: {
            grid: {
                root: cn('col-span-1 h-[250px]'),
                actionsArea: cn('flex flex-col'),
                titleText: cn('truncate'),
                descriptionText: cn('truncate'),
            },
            list: {
                root: cn('w-full'),
                actionsArea: cn('grid grid-cols-2'),
                media: cn('col-span-1 h-34'),
                content: cn('flex-1 justify-start'),
                titleText: cn(''),
                descriptionText: cn(''),
                priceWithDiscount: cn(''),
            },
            complete: {
                root: cn('h-[320px] ring-[var(--mui-palette-grey-100)]'),
                actionsArea: cn('flex flex-col'),
                media: cn('h-40 rounded-none'),
                titleText: cn(),
                descriptionText: cn(),
                content: cn('flex flex-col flex-1 p-4 pt-2'),
                priceWithDiscount: cn('mt-auto justify-start items-start'),
            },
        },
    },
});

type ProductCardVariants = VariantProps<typeof productCard>;

type ProductCardProps = Omit<ProductCardVariants, 'hasDiscount'> & {
    offer: Offer;
    size?: ComponentProps<typeof PriceWithDiscount>['size'];
    showDescription?: boolean;
    showDiscountTimeLeft?: boolean;
};

type ProductCardTimeLeftProps = {
    show: boolean;
    timeLeft: string | null;
    className?: string;
} & ProductCardVariants;

const ProductCardTimeLeft: FC<ProductCardTimeLeftProps> = ({
    show,
    timeLeft,
    variant,
    className,
}) => {
    'use memo'
    const { timeleftText } = productCard();

    const t = useTranslations();

    if (!show || !timeLeft) return null;

    return (
        <Typography
            role='complementary'
            component='span'
            className={timeleftText({
                variant,
                className,
            })}
        >
            {t('discountTimeLeft', { left: timeLeft })}
        </Typography>
    );
}

type ProductCardMediaImageProps = Pick<ComponentProps<typeof CardMediaImage>,
    'src'
    | 'alt'
    | 'className'
> & object;

const ProductCardMediaImage: FC<ProductCardMediaImageProps> = ({ ...props }) => {
    'use memo'

    return (
        <CardMediaImage
            {...props}
            priority
            width={200}
            height={200}
            quality={100}
        />
    );
}

type ProductCardGridVariantProps = Omit<ProductCardProps, 'variant' | 'showDiscountTimeLeft' | 'showDescription'>;

const ProductCardGridVariant: FC<ProductCardGridVariantProps> = ({
    offer,
}) => {
    'use memo'
    const {
        slug,
        title,
        description,
        price,
        banner,
        discount,
    } = offer;

    const {
        root,
        actionsArea,
        media,
        mediaImage,
        content,
        titleText,
        descriptionText,
        priceWithDiscount,
    } = productCard({
        variant: 'grid',
    });

    return (
        <CardRoot rounded='xl' className={root()}>
            <CardActionsArea
                scroll
                prefetch
                href={'/product/' + slug as any}
                className={actionsArea()}
            >
                <CardMedia alt={title} className={media()}>
                    <ProductCardMediaImage src={banner} alt={title} className={mediaImage()}/>
                </CardMedia>
                <CardContent className={content()}>
                    <Typography
                        component='h2'
                        className={titleText()}
                    >
                        {title}
                    </Typography>
                    {description && !discount && (
                        <Typography component='p' className={descriptionText()}>
                            {description}
                        </Typography>
                    )}
                    <PriceWithDiscount
                        size='md'
                        orientation='vertical'
                        price={price}
                        discount={discount}
                        className={priceWithDiscount()}
                    />
                </CardContent>
            </CardActionsArea>
        </CardRoot>
    );
}

type ProductCardListVariantProps = Omit<ProductCardProps, 'variant'>;

const ProductCardListVariant: FC<ProductCardListVariantProps> = ({
    offer,
}) => {
    'use memo'
    const {
        slug,
        banner,
        title,
        description,
        price,
        discount,
    } = offer;

    const {
        root,
        actionsArea,
        media,
        mediaImage,
        content,
        titleText,
        descriptionText,
        priceWithDiscount,
    } = productCard({
        variant: 'list',
    });

    return (
        <CardRoot className={root()}>
            <CardActionsArea
                href={'/product/' + slug}
                className={actionsArea()}
            >
                <CardMedia className={media()}>
                    <ProductCardMediaImage src={banner} alt={title} className={mediaImage()}/>
                </CardMedia>
                <CardContent className={content()}>
                    <Typography component='h2' className={titleText()}>
                        {title}
                    </Typography>
                    <ExpandableText
                        text={description}
                        isExpandable={false}
                        className={descriptionText()}
                    />
                    <PriceWithDiscount
                        orientation='horizontal'
                        price={price}
                        discount={discount}
                        className={priceWithDiscount()}
                    />
                </CardContent>
            </CardActionsArea>
        </CardRoot>
    );
}

type ProductCardCompleteVariantProps = Omit<ProductCardProps, 'variant'>;

const ProductCardCompleteVariant: FC<ProductCardCompleteVariantProps> = ({
    offer,
}) => {
    'use memo'
    const {
        slug,
        banner,
        title,
        endDate,
        description,
        price,
        discount,
    } = offer;

    const {
        root,
        actionsArea,
        media,
        content,
        mediaImage,
        titleText,
        priceWithDiscount,
    } = productCard({
        variant: 'complete',
    });

    const timeLeft = useCountdown({
        date: endDate,
    });

    return (
        <CardRoot className={root()}>
            <CardActionsArea
                href={'/product/' + slug}
                className={actionsArea()}
            >
                <CardHeader title={title} className={titleText()}/>
                <CardMedia className={media()}>
                    <ProductCardMediaImage src={banner} alt={title} className={mediaImage()}/>
                </CardMedia>
                <CardContent className={content()}>
                    <ProductCardTimeLeft show timeLeft={timeLeft}/>
                    <ExpandableText
                        isExpandable={false}
                        text={description}
                    />
                    <PriceWithDiscount
                        orientation='horizontal'
                        price={price}
                        discount={discount}
                        className={priceWithDiscount()}
                    />
                </CardContent>
            </CardActionsArea>
        </CardRoot>
    );
}

const layoutMap = {
    'list': ProductCardListVariant,
    'grid': ProductCardGridVariant,
    'complete': ProductCardCompleteVariant,
} as const;

const ProductCard: FC<ProductCardProps> = ({
    variant = 'grid',
    ...props
}) => {
    'use memo'

    const Layout = layoutMap?.[variant] || layoutMap?.['complete'];

    return (
        <Layout {...props}/>
    );
}

export default ProductCard;
