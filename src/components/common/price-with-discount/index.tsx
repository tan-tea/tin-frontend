'use client';

import type { FC } from 'react';
import type { VariantProps } from 'tailwind-variants';

import { useMemo } from 'react';
import { tv } from 'tailwind-variants';
import { useTranslations } from 'next-intl';

import { formatCurrency } from 'lib/utils';

import { Wrapper } from 'ui/layout';
import { Heading, Paragraph } from 'ui/text';

const priceWithDiscount = tv({
    slots: {
        box: 'flex text-primary',
        value: 'font-primary-alt',
        valueWithDiscount: '',
        discount: 'text-[var(--mui-palette-primary-main)] bg-[var(--mui-palette-primary-main)] pl-2 pr-1.5 py-1 rounded-lg',
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
    price: number | string;
    discount: number;
    className?: string;
};

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

    const parsedPrice = useMemo<number>(
        () => typeof price === 'string' ? Number(price) : price,
        [price],
    );

    const priceWithDiscountApplied = useMemo<number>(
        () => parsedPrice * (1 - discount / 100),
        [parsedPrice, discount,]
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
        <Wrapper className={box({
            className,
        })}>
            {hasDiscount && (
                <Heading
                    level='3'
                    color='primary'
                    className={valueWithDiscount()}
                >
                    {formatCurrency('COP', priceWithDiscountApplied)}
                </Heading>
            )}
            <div className='flex items-center gap-x-1'>
                {(hasDiscount && orientation === 'vertical') && (
                    <Paragraph className={discountSlot()}>{t('discountPercentage', {
                        value: Math.round(discount),
                    })}</Paragraph>
                )}
                <Heading
                    color='primary'
                    level='3'
                    through={hasDiscount}
                    className={value()}
                >
                    {formatCurrency('COP', parsedPrice)}
                </Heading>
            </div>
        </Wrapper>
    );
}

export default PriceWithDiscount;
