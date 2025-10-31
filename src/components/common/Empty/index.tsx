'use client'

import type {
    ComponentProps,
    FC,
    Ref
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';

import dynamic from 'next/dynamic';

import Box from 'ui/box';
import Text from 'ui/text';

const ProductDetailImage = dynamic(
    () => import('feature/ProductDetail/components/ProductDetailImage'),
    {
        ssr: false,
    },
);

const empty = tv({
    slots: {
        container: 'relative flex flex-col px-8 py-4 gap-y-4 text-center',
        imageContainer: 'min-w-full rounded-full bg-transparent',
        image: 'object-fill',
        title: 'font-secondary text-xl font-bold',
    },
    variants: {},
    defaultVariants: {},
});

type EmptyVariants = VariantProps<typeof empty>;

type EmptyProps = EmptyVariants & Pick<ComponentProps<'div'>, 'style'> & {
    ref?: Ref<HTMLDivElement>;
    image: string;
    title: string;
};

const Empty: FC<EmptyProps> = (props) => {
    const {
        ref,
        image,
        title,
        ...rest
    } = props;

    const {
        container,
        imageContainer,
        image: imageSlot,
        title: titleSlot,
    } = empty();

    return (
        <Box
            {...rest}
            ref={ref}
            className={container()}
        >
            <ProductDetailImage
                image={image}
                alt={title}
                className={imageContainer()}
                imageClassName={imageSlot()}
            />
            <Box>
                <Text variant='h2' className={titleSlot()}>
                    {title}
                </Text>
            </Box>
        </Box>
    )
};

export default Empty;
