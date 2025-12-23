'use client';

import type { FC, ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { Fragment } from 'react';
import { tv, cn } from 'tailwind-variants';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import BlankImage from 'public/images/blank.svg';

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

import ExpandableText from 'common/expandable-text';
import PriceWithDiscount from 'common/price-with-discount';

const offerCard = tv({
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
        titleText: cn('text-[15px] font-primary-alt leading-4.5 font-bold md:text-lg'),
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
                media: 'rounded-b-none'
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

type OfferCardVariants = VariantProps<typeof offerCard>;

type OfferCardProps = Omit<OfferCardVariants, 'hasDiscount'> & {
    offer: Offer;
    size?: ComponentProps<typeof PriceWithDiscount>['size'];
    showDescription?: boolean;
    showDiscountTimeLeft?: boolean;
};

type OfferCardTimeLeftProps = {
    show: boolean;
    timeLeft: string | null;
    className?: string;
} & OfferCardVariants;

const OfferCardTimeLeft: FC<OfferCardTimeLeftProps> = ({
    show,
    timeLeft,
    variant,
    className,
}) => {
    'use memo'
    const { timeleftText } = offerCard();

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

type OfferCardMediaImageProps = Pick<ComponentProps<typeof CardMediaImage>,
    'src'
    | 'alt'
    | 'className'
> & object;

const OfferCardMediaImage: FC<OfferCardMediaImageProps> = ({
    src,
    ...props
}) => {
    'use memo'

    return (
        <CardMediaImage
            {...props}
            priority
            src={src ?? BlankImage}
            width={200}
            height={200}
            quality={100}
        />
    );
}

type OfferCardGridVariantProps = Omit<OfferCardProps, 'variant' | 'showDiscountTimeLeft' | 'showDescription'>;

const OfferCardGridVariant: FC<OfferCardGridVariantProps> = ({
    offer,
}) => {
    'use memo'
    const {
        title,
        description,
        price,
        banner,
        discount,
    } = offer;

    const {
        media,
        mediaImage,
        content,
        titleText,
        descriptionText,
        priceWithDiscount,
    } = offerCard({
        variant: 'grid',
    });

    return (
        <Fragment>
            <CardMedia alt={title} className={media()}>
                <OfferCardMediaImage src={banner} alt={title} className={mediaImage()}/>
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
        </Fragment>
    );
}

type OfferCardListVariantProps = Omit<OfferCardProps, 'variant'>;

const OfferCardListVariant: FC<OfferCardListVariantProps> = ({
    offer,
}) => {
    'use memo'
    const {
        banner,
        title,
        description,
        price,
        discount,
    } = offer;

    const {
        media,
        mediaImage,
        content,
        titleText,
        descriptionText,
        priceWithDiscount,
    } = offerCard({
        variant: 'list',
    });

    return (
        <Fragment>
            <CardMedia className={media()}>
                <OfferCardMediaImage src={banner} alt={title} className={mediaImage()}/>
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
        </Fragment>
    );
}

type OfferCardCompleteVariantProps = Omit<OfferCardProps, 'variant'>;

const OfferCardCompleteVariant: FC<OfferCardCompleteVariantProps> = ({
    offer,
}) => {
    'use memo'
    const {
        banner,
        title,
        endDate,
        description,
        price,
        discount,
    } = offer;

    const {
        media,
        content,
        mediaImage,
        titleText,
        priceWithDiscount,
    } = offerCard({
        variant: 'complete',
    });

    const timeLeft = useCountdown({
        date: endDate,
    });

    return (
        <Fragment>
            <CardHeader title={title} className={titleText()}/>
            <CardMedia className={media()}>
                <OfferCardMediaImage src={banner} alt={title} className={mediaImage()}/>
            </CardMedia>
            <CardContent className={content()}>
                <OfferCardTimeLeft show timeLeft={timeLeft}/>
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
        </Fragment>
    );
}

const contentMap = {
    'list': OfferCardListVariant,
    'grid': OfferCardGridVariant,
    'complete': OfferCardCompleteVariant,
} as const;

const OfferCard: FC<OfferCardProps> = ({
    variant = 'grid',
    ...props
}) => {
    'use memo'
    const { root, actionsArea } = offerCard({
        variant,
    })

    const { slug } = useParams<{ slug: string }>();

    const Content = contentMap?.[variant] || contentMap?.['complete'];

    const target = `/store/${slug}/item/${props.offer.slug}`;

    return (
        <CardRoot rounded='xl' className={root()}>
            <CardActionsArea href={target as any} className={actionsArea()}>
                <Content {...props}/>
            </CardActionsArea>
        </CardRoot>
    );
}

export default OfferCard;
