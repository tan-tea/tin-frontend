'use client'

import {
    useEffect,
    useRef,
    type FC,
    type MouseEventHandler,
} from 'react';

import { clientEnv } from 'env/client';

import {
    useScroll,
    useComputedStyle,
} from 'shared/hooks';

import {
    Box,
    Typography,
} from 'ui/index';

import type {
    ProductDetailProps,
} from 'feature/ProductDetail';

import Section from 'common/Section';
import Titlebar from 'common/Titlebar';
import BackButton from 'common/buttons/BackButton';
import ShareButton from 'common/buttons/ShareButton';
import ExpandableText from 'common/ExpandableText';
import PriceWithDiscount from 'common/PriceWithDiscount';

import ProductDetailImage from 'feature/ProductDetail/components/ProductDetailImage';
import ProductDetailButton from 'feature/ProductDetail/components/ProductDetailButton';
import ProductDetailTitle from 'feature/ProductDetail/components/ProductDetailTitle';

type ProductDetailMobileProps = ProductDetailProps;

const ProductDetailMobile: FC<ProductDetailMobileProps> = (props) => {
    'use memo'
    const {
        t,
        offer,
    } = props;

    const {
        scroll,
    } = useScroll();

    const productDetailButtonRef = useRef<HTMLDivElement | null>(null);
    const productDetailButtonComputedStyle = useComputedStyle(productDetailButtonRef);

    const handleClick: MouseEventHandler = () => {
        const translated = t('message', { name: offer?.title });
        const message = encodeURIComponent(translated);
        const target = new URL(`https://wa.me/${clientEnv.NEXT_PUBLIC_WORKSPACE_NUMBER}?text=${message}`);
        window.open(target, '_blank');
    }

    useEffect(() => {
        const previousScroll = { ...scroll };
        window.scrollTo({ top: 0, behavior: 'smooth' });

        return () => {
            window.scroll(previousScroll.x, previousScroll.y);
        };
    }, []);

    return (
        <Section
            label={t('title')}
            description={t('title')}
            className='min-h-dvh'
        >
            <Titlebar
                position='relative'
                title={offer?.title}
                renderStart={({ title, }) => <BackButton showLabel={title ? false : true}/>}
                renderEnd={() => (
                    <Box className='ml-auto flex items-center gap-x-2'>
                        <ShareButton shareableItem={{
                            heading: offer?.title,
                            description: offer?.description,
                        }}/>
                    </Box>
                )}
            />
            <ProductDetailImage
                alt={offer?.title || offer?.description}
                image={offer?.banner}
            />
            <Box
                className='relative size-full flex flex-col gap-y-4 p-4'
                style={{
                    marginBottom: `${parseFloat(productDetailButtonComputedStyle?.height ?? '0')}px`,
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
                {offer?.type?.attributes?.length! > 0 && (
                    <Box className='relative flex flex-col justify-center gap-y-4'>
                        {offer?.type?.attributes?.map?.(attribute => (
                            <Box
                                key={attribute?.id}
                                className='flex flex-col gap-y-1.5 shadow-xs px-4 py-2.5 rounded-xl border border-[var(--mui-palette-grey-50)] dark:border-dark-400'
                            >
                                <Typography className='text-sm font-semibold text-[var(--mui-palette-secondary-main)]'>
                                    {attribute?.name}
                                </Typography>
                                <Box className='flex items-center gap-x-2'>
                                    {attribute?.values
                                        ?.filter(value => attribute?.isGlobal || value?.offerId === offer?.id)
                                        ?.map((value, index) => (
                                            <Typography
                                                key={index}
                                                className='p-2 py-1.5 text-xs rounded-full bg-[var(--mui-palette-grey-50)] text-dark-600 dark:bg-dark-400 dark:text-white'
                                            >
                                                {value?.label ?? value?.value}
                                            </Typography>
                                        ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
            <ProductDetailButton
                ref={productDetailButtonRef}
                onClick={handleClick}
            />
        </Section>
    );
};

export default ProductDetailMobile;
