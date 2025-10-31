'use client'

import {
    useMemo,
    type FC
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';

import { Offer } from 'shared/models';

import { Box, Separator, Text } from 'ui/index';

const productDetailTitle = tv({
    slots: {
        container: 'w-full h-auto',
        title: 'capitalize font-bold text-2xl leading-6',
        subtitle: 'text-base text-[var(--mui-palette-grey-400)] dark:text-[var(--mui-palette-grey-100)]',
        wrapper: 'flex-1 h-full flex items-center gap-x-1.5 flex-wrap mt-1',
    },
    variants: {},
    defaultVariants: {},
    compoundSlots: [],
});

type ProductDetailTitleVariants = VariantProps<typeof productDetailTitle>;

type ProductDetailTitleProps = ProductDetailTitleVariants & {
    offer: Offer;
};

const ProductDetailTitle: FC<ProductDetailTitleProps> = (props) => {
    const {
        offer,
    } = props;

    const {
        container,
        title,
        subtitle,
        wrapper,
    } = productDetailTitle({});

    const displaySubTitles = useMemo<Array<string>>(
        () => {
            return [
                offer?.type?.name!,
                'separator',
                offer?.category?.label!
            ];
        },
        [offer?.type?.name, offer?.category?.label],
    );

    return (
        <Box className={container()}>
            <Text className={title()}>
                {offer?.title}
            </Text>
            <Box className={wrapper()}>
                {displaySubTitles.map((s) => (s === 'separator'
                    ? <Separator key={s} orientation='vertical'/>
                    : <Text key={s} className={subtitle()}>{s}</Text>
                ))}
            </Box>
        </Box>
    );
};

export default ProductDetailTitle;
