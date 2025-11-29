'use client';

import {
    useMemo,
    type FC,
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
} from 'ui/index';

const priceWithDiscount = tv({
    slots: {
        box: 'flex text-primary',
        value: 'font-nunito',
        valueWithDiscount: '',
        discount: 'text-[var(--mui-palette-primary-main)] bg-[var(--mui-palette-primary-50)] pl-2 pr-1.5 py-1 rounded-lg',
    },
    variants: {
        size: {
            sm: {
                value: 'text-sm leading-3 md:text-base',
                valueWithDiscount: 'text-sm leading-4 md:text-lg',
                discount: 'text-xs md:text-sm',
            },
            md: {
                value: 'text-lg md:text-lg leading-5',
                valueWithDiscount: 'text-lg md:text-xl leading-5',
                discount: 'text-sm md:text-base leading-4',
            },
            lg: {
                value: 'text-xl md:text-2xl leading-5',
                valueWithDiscount: 'text-2xl md:text-3xl leading-6',
                discount: 'text-sm md:text-base leading-4',
            },
        },
        orientation: {
            horizontal: {
                box: 'flex-row items-center gap-x-1',
            },
            vertical: {
                box: 'flex-col items-start justify-center gap-y-1',
            },
        },
        hasDiscount: {
            true: {
                value: 'text-gray-400',
                valueWithDiscount: 'text-[var(--mui-palette-primary-main)]',
            },
        },
    },
    defaultVariants: {
        size: 'md',
        orientation: 'horizontal',
        hasDiscount: false,
    },
    compoundSlots: [
        {
            slots: ['value', 'valueWithDiscount', 'discount'],
            class: 'font-[800] font-nunito'
        },
        {
            slots: ['value',],
            size: 'md',
            hasDiscount: true,
            class: 'text-sm',
        },
        {
            slots: ['value',],
            size: 'lg',
            hasDiscount: true,
            class: 'text-base',
        }
    ],
});

type ProductCardVariants = VariantProps<typeof priceWithDiscount>;

type PriceWithDiscountProps = Omit<ProductCardVariants, 'hasDiscount'> & {
    price: number;
    discount: number;
    className?: string;
};

function roundToCOP(price: number) {
    return Math.floor(price / 50) * 50;
}

const PriceWithDiscount: FC<PriceWithDiscountProps> = ({
    price,
    size,
    orientation = 'horizontal',
    className,
    discount = 0,
}) => {
    'use memo'
    const t = useTranslations();

    const hasDiscount = useMemo<boolean>(
        () => discount > 0,
        [discount,]
    );

    const priceWithDiscountApplied = useMemo<number>(
        () => price * (1 - discount / 100),
        [price, discount,]
    );

    const {
        box,
        value,
        valueWithDiscount,
        discount: discountSlot,
    } = priceWithDiscount({
        size,
        hasDiscount,
        orientation,
    });

    return (
        <Box className={box({
            className,
        })}>
            {hasDiscount && (
                <Text
                    variant='h2'
                    component='h3'
                    className={valueWithDiscount()}
                >
                    {formatCurrency('COP', roundToCOP(priceWithDiscountApplied))}
                </Text>
            )}
            <Box className='flex items-center gap-x-1'>
                {(hasDiscount && orientation === 'vertical') && (
                    <Text className={discountSlot()}>{t('discountPercentage', {
                        value: Math.round(discount),
                    })}</Text>
                )}
                <Text
                    through={hasDiscount}
                    variant='h2'
                    component='h3'
                    className={value()}
                >
                    {formatCurrency('COP', roundToCOP(price))}
                </Text>
            </Box>
        </Box>
    );
}

export default PriceWithDiscount;
