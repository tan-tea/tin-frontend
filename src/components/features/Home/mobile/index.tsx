'use client'

import {
    useMemo,
    useRef,
    type FC,
} from 'react';

import dynamic from 'next/dynamic';
import Autoplay from 'embla-carousel-autoplay';

import Box from 'ui/box';
import Text from 'ui/text';
import {
    Carousel,
    CarouselItem,
    CarouselContent,
} from 'ui/carousel';

import type {
    HomeProps,
} from 'feature/Home';

import OfferList from 'components/OfferList';
import Empty from 'common/Empty';
import Section from 'common/Section';
import ProductCardSkeleton from 'common/ProductCard/skeleton';
import CategoryCardSkeleton from 'common/CategoryCard/skeleton';

const ProductCard = dynamic(
    () => import('common/ProductCard'),
    {
        loading: () => <ProductCardSkeleton/>
    },
);

const CategoryCard = dynamic(
    () => import('common/CategoryCard'),
    {
        loading: () => <CategoryCardSkeleton/>
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
            label={t('titles.home.title')}
            description={t('titles.home.description')}
            className='h-full scrollbar-hide'
        >
            <Box className='size-full flex flex-col gap-y-4 p-4 pt-0 max-w-7xl mx-auto'>
                {categories?.length! > 0 && (
                    <Box className='w-full h-auto flex items-stretch gap-x-4 overflow-x-scroll scrollbar-hide'>
                        {categories
                            ?.sort?.((a, b) => a?.position - b?.position)
                            ?.map?.(category => (
                                <CategoryCard
                                    selected={category?.id === selectedCategory?.id}
                                    onSelectCategory={(id) => onSelectCategory(categories?.find?.(c => c.id === id))}
                                    key={category?.id}
                                    {...category}
                                />
                        ))}
                    </Box>
                )}
                {(discounts?.length > 0 && !selectedCategory) && (
                    <Box className='flex flex-col gap-y-2'>
                        <Text component='h3' className='font-bold text-lg leading-4.5 font-nunito'>
                            {t('exploreDiscounts')}
                        </Text>
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
