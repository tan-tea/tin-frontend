'use client'

import {
    useRef,
    type FC,
} from 'react';
import Image from 'next/image';

import {
    Box,
    Text,
    Separator,
} from 'ui/index';

import { ProductDetailProps, } from 'feature/ProductDetail';

import BackButton from 'common/BackButton';
import PriceWithDiscount from 'common/PriceWithDiscount';

type ProductDetailMobileProps = ProductDetailProps;

const ProductDetailMobile: FC<ProductDetailMobileProps> = (
    props: ProductDetailMobileProps
) => {
    const {
        t,
        offer,
    } = props;

    const imageRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);

    const headerHeight = headerRef?.current?.clientHeight || 0;

    return (
        <Box
            component='section'
            className='relative min-h-dvh size-full bg-inherit pb-6'
        >
            <Box className='size-full p-4'>
                <Box
                    ref={headerRef}
                    className='relative flex items-center justify-between mb-4'>
                    <BackButton showLabel={false}/>
                    <Text className='font-semibold leading-5 text-dark-600'>
                        {t('title')}
                    </Text>
                    <BackButton
                        className='invisible'
                        showLabel={false}
                    />
                </Box>
                <Box className='relative size-full flex flex-col gap-y-4'>
                    <Box
                        ref={imageRef}
                        component='div'
                        className='h-80 w-full bg-light-400 rounded-2xl overflow-hidden'
                    >
                        <Image
                            priority
                            src={offer?.banner !== '' ? offer?.banner :  '/images/blank.svg'}
                            alt={offer?.title}
                            width={500}
                            height={500}
                            className='relative size-full object-cover'
                        />
                    </Box>
                    <Box className='relative flex-1 flex flex-col gap-y-4'>
                        <Box className='flex justify-between gap-x-4'>
                            <Box className='flex flex-col gap-y-1'>
                                <Text className='font-primary font-bold capitalize text-2xl leading-6'>
                                    {offer?.title}
                                </Text>
                                <Box className='flex items-center gap-x-2 text-gray-400 capitalize text-base leading-4'>
                                    <Text>{offer?.type?.name}</Text>
                                    <Separator orientation='vertical'/>
                                    <Text>{offer?.category?.label}</Text>
                                </Box>
                            </Box>
                            <PriceWithDiscount
                                orientation='vertical'
                                price={offer?.price}
                                discount={offer?.discount}
                            />
                        </Box>
                        <Box className='flex flex-col gap-y-2'>
                            <Text className='font-bold'>{t('availableOptions')}</Text>
                            <Box className='relative flex items-center gap-x-6 overflow-x-auto scrollbar-hide -mx-4 pb-2 px-4'>
                                {offer?.type?.attributes?.map(attribute => (
                                    <Box
                                        key={attribute?.id}
                                        className='flex flex-col gap-y-1.5 shadow-md px-3 py-2 rounded-2xl border border-gray-50 shrink-0'
                                    >
                                        <Text className='text-sm font-semibold text-gray-400 capitalize'>
                                            {attribute?.name}
                                        </Text>
                                        <Box className='flex items-center gap-x-2'>
                                            {attribute?.values
                                                ?.filter(value => value?.offerId === offer?.id)
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
                        </Box>
                        <Separator/>
                        <Box className='flex flex-col gap-y-1'>
                            <Text className='font-bold'>{t('description')}</Text>
                            <Text className='leading-6'>{offer?.description || t('notProvided')}</Text>
                        </Box>
                        <Box className=''>
                            Hola
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetailMobile;
