'use client'

import {
    useRef,
    type FC,
} from 'react';

import { useComputedStyle, useScroll } from 'shared/hooks';

import {
    Box,
    Text,
} from 'ui/index';

import { ProductDetailProps, } from 'feature/ProductDetail';

import Section from 'common/Section';
import Titlebar from 'common/Titlebar';
import BackButton from 'common/BackButton';
import ExpandableText from 'common/ExpandableText';
import PriceWithDiscount from 'common/PriceWithDiscount';

import ProductDetailImage from 'feature/ProductDetail/components/ProductDetailImage';
import ProductDetailButton from 'feature/ProductDetail/components/ProductDetailButton';
import ProductDetailTitle from 'feature/ProductDetail/components/ProductDetailTitle';

type ProductDetailMobileProps = ProductDetailProps;

const ProductDetailMobile: FC<ProductDetailMobileProps> = (
    props: ProductDetailMobileProps
) => {
    const {
        t,
        offer,
    } = props;

    const {
        scroll,
    } = useScroll();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const productDetailButtonRef = useRef<HTMLDivElement | null>(null);

    const productDetailButtonComputedStyle = useComputedStyle(productDetailButtonRef.current!);

    return (
        <Section
            label={t('title')}
            description={t('title')}
            className='h-auto'
        >
            <Titlebar
                position='relative'
                title={offer?.title}
                renderStart={({ title, }) => <BackButton showLabel={title ? false : true}/>}
            />
            <ProductDetailImage
                alt={offer?.title || offer?.description}
                image={offer?.banner}
            />
            <Box
                ref={containerRef}
                className='relative size-full flex flex-col gap-y-4 p-4'
                style={{
                    marginBottom: `${parseFloat(productDetailButtonComputedStyle?.height ?? `0`)}px`,
                }}
            >
                <PriceWithDiscount
                    size='lg'
                    orientation='vertical'
                    price={offer?.price}
                    discount={offer?.discount}
                />
                <ProductDetailTitle offer={offer}/>
                <ExpandableText text={offer?.description || t('notProvided')}/>
                {offer?.type?.attributes?.length && offer?.type?.attributes?.length > 0 && (
                    <Box className='relative flex flex-col justify-center gap-y-4'>
                        {offer?.type?.attributes?.map(attribute => (
                            <Box
                                key={attribute?.id}
                                className='flex flex-col gap-y-1.5 shadow-xs px-4 py-2.5 rounded-xl border border-[var(--mui-palette-grey-50)]'
                            >
                                <Text className='text-sm font-semibold text-[var(--mui-palette-secondary-main)]'>
                                    {attribute?.name}
                                </Text>
                                <Box className='flex items-center gap-x-2'>
                                    {attribute?.values
                                        ?.filter(value => attribute?.isGlobal || value?.offerId === offer?.id)
                                        ?.map(value => (
                                            <Text
                                                key={value?.id}
                                                className='p-2 py-1.5 text-xs rounded-full bg-light-400 text-dark-600'
                                            >
                                                {value?.label !== '' ? value?.label : value?.value}
                                            </Text>
                                        ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
            <ProductDetailButton ref={productDetailButtonRef}/>
        </Section>
    );
};

export default ProductDetailMobile;
