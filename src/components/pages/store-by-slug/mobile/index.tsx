'use client'

import type { FC } from 'react';

import { Section } from 'ui/layout';

import type { StoreBySlugProps } from 'pages/store-by-slug';

import OfferList from 'features/offer/list';
import CategoryList from 'features/category/list';
import NavigationBreadcrumb from 'features/navigation/breadcrumb';

type StoreBySlugMobileProps = StoreBySlugProps

const StoreBySlugMobile: FC<StoreBySlugMobileProps> = ({
    shop,
    offers,
}) => {
    'use memo'
    // const discounts = useMemo<typeof offers>(
    //     () => offers.filter(o => o.discount && o.discount > 0),
    //     [offers,],
    // );

    return (
        <Section
            role='application'
            aria-label={shop.name}
            aria-description={shop.slug}
            className='overflow-hidden'
        >
            <div className='px-4 pb-2'>
                <NavigationBreadcrumb/>
            </div>
                {/* {(discounts?.length > 0 && !selectedCategory) && (
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
                )} */}
            <CategoryList/>
            <OfferList offers={offers}/>
        </Section>
    );
}

export default StoreBySlugMobile;
