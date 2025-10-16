'use client';

import {
    useMemo,
    type FC,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';

import { formatCurrency } from 'lib/utils';

import {
    Box,
    Text,
} from 'ui/index';

const priceWithDiscount = tv({
    slots: {
        box: 'w-auto h-6 flex items-center gap-x-1 text-lg text-primary md:text-xl',
        value: 'text-[length:inherit] font-bold leading-inherit',
        valueWithDiscount: 'text-[length:inherit] font-bold leading-inherit',
    },
    variants: {
        orientation: {
            horizontal: {
                box: 'flex-row items-center',
            },
            vertical: {
                box: 'flex-col gap-y-1',
            },
        },
        hasDiscount: {
            true: {
                value: 'text-base leading-4 text-gray-400',
                valueWithDiscount: 'text-lg leading-5 text-primary',
            },
        },
    },
});

type ProductCardVariants = VariantProps<typeof priceWithDiscount>;

type PriceWithDiscountProps = Omit<ProductCardVariants, 'hasDiscount'> & {
    price: number;
    discount: number;
    className?: string;
};

const PriceWithDiscount: FC<PriceWithDiscountProps> = (
    props: PriceWithDiscountProps,
) => {
    const {
        price,
        orientation = 'horizontal',
        className,
        discount = 0,
    } = props;

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
    } = priceWithDiscount({
        className,
        hasDiscount,
        orientation,
    });

    return (
        <Box className={box()}>
            {hasDiscount && (
                <Text
                    variant='h2'
                    component='h3'
                    className={valueWithDiscount()}
                >
                    {formatCurrency('COP', priceWithDiscountApplied)}
                </Text>
            )}
            <Text
                through={hasDiscount}
                variant='h2'
                component='h3'
                className={value()}
            >
                {formatCurrency('COP', price)}
            </Text>
        </Box>
    );
}

export default PriceWithDiscount;
