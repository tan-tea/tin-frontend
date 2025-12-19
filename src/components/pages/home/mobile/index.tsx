'use client'

import type { FC } from 'react';

import { useMemo, useRef } from 'react';

import dynamic from 'next/dynamic';
import Autoplay from 'embla-carousel-autoplay';

import Box from 'ui/box';
import { Heading } from 'ui/text';
import {
    Carousel,
    CarouselItem,
    CarouselContent,
} from 'ui/carousel';

import type {
    HomeProps,
} from 'components/pages/home';

import OfferList from 'components/offer-list';
import Empty from 'common/Empty';
import Section from 'common/Section';
import ProductCardSkeleton from 'common/ProductCard/skeleton';
import CategoryCardSkeleton from 'components/common/category-card/skeleton';

const ProductCard = dynamic(
    () => import('common/ProductCard'),
    {
        ssr: false,
        loading: () => <ProductCardSkeleton/>
    },
);

const CategoryCard = dynamic(
    () => import('components/common/category-card'),
    {
        ssr: false,
        loading: () => <CategoryCardSkeleton/>,
    },
);

type HomeMobileProps = HomeProps;

const HomeMobile: FC<HomeMobileProps> = ({
    t,
    offers,
    offersLoading,
    categories,
    selectedCategory,
    currentWorkspace: workspace,
    onSelectCategory,
}) => {
    'use memo'
    const sectionRef = useRef<HTMLElement | null>(null);

    const discounts = useMemo<typeof offers>(
        () => offers.filter(o => o.discount && o.discount > 0),
        [offers,],
    );

    return (
        <Section
            ref={sectionRef}
            label={t('metadata.titles.home.title')}
            description={t('metadata.titles.home.description')}
            className='h-full scrollbar-hide'
        >
            <Box className='size-full flex flex-col gap-y-4 p-4 pt-0 max-w-7xl mx-auto'>
                {categories?.length! > 0 && (
                    <Box className='w-full h-auto flex items-stretch gap-x-4 overflow-x-scroll scrollbar-hide'>
                        {categories
                            ?.sort?.((a, b) => a?.position - b?.position)
                            ?.map?.(category => (
                                <CategoryCard
                                    key={category?.id}
                                    category={category}
                                    selected={category?.id === selectedCategory?.id}
                                    onSelectCategory={(id) => onSelectCategory(categories?.find?.(c => c.id === id))}
                                />
                        ))}
                    </Box>
                )}
                {(discounts?.length > 0 && !selectedCategory) && (
                    <Box className='flex flex-col gap-y-2'>
                        <Heading>
                            {t('exploreDiscounts')}
                        </Heading>
                        <Carousel
                            className='w-full'
                            opts={{ loop: true }}
                            plugins={[
                                Autoplay({
                                    playOnInit: true,
                                    delay: 10000,
                                }),
                            ]}
                        >
                            <CarouselContent>
                                {discounts?.map?.(discount => (
                                    <CarouselItem key={discount?.title}>
                                        <ProductCard
                                            variant='grid'
                                            showDiscountTimeLeft
                                            offer={discount}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </Box>
                )}
                <OfferList offers={offers} loading={offersLoading}/>
            </Box>
            {!offers || offers?.length <= 0 && (
                <Empty
                    title={t('home.notOffers')}
                    image={`https://ssfdpagynvyveoschegx.supabase.co/storage/v1/object/public/assets/${workspace?.id}/not-found.svg`}
                    style={{
                        transform: 'translateY(0%)',
                    }}
                />
            )}
        </Section>
    );
};

export default HomeMobile;
