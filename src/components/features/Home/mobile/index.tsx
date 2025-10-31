'use client'

import {
    useRef,
    type FC,
} from 'react';

import dynamic from 'next/dynamic';

import { useComputedStyle } from 'shared/hooks';

import { Box } from 'ui/index';

import type {
    HomeProps,
} from 'feature/Home';

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

const HomeMobile: FC<HomeMobileProps> = (
    props: HomeMobileProps
) => {
    const {
        t,
        offers,
        categories,
        selectedCategory,
        currentWorkspace: workspace,
        onSelectCategory,
    } = props;

    const parentRef = useRef<HTMLElement | null>(null);

    const parentComputedStyle = useComputedStyle(parentRef.current!);

    const parentHeight = parseFloat(parentComputedStyle?.height ?? '0');

    return (
        <Section
            ref={parentRef}
            label={t('titles.home.title')}
            description={t('titles.home.description')}
            className='h-full'
        >
            <Box className='size-full flex flex-col gap-y-4 p-4 pt-0'>
                {categories && categories?.length > 0 && (
                    <Box className='w-full h-auto flex items-stretch gap-x-4 overflow-x-scroll scrollbar-hide'>
                        {categories?.map?.(category => (
                            <CategoryCard
                                selected={category?.id === selectedCategory}
                                onSelectCategory={onSelectCategory}
                                key={category?.id}
                                {...category}
                            />
                        ))}
                    </Box>
                )}
                {offers && offers?.length > 0 && (
                    <Box className='size-full flex-1 grid grid-cols-2 gap-2'>
                        {offers?.map?.(offer => (
                            <ProductCard
                                id={offer?.id}
                                key={offer?.id}
                                image={offer?.banner}
                                title={offer?.title}
                                discount={offer?.discount}
                                price={offer?.price}
                                description={offer?.description}
                                className='col-span-1 gap-y-2'
                            />
                        ))}
                    </Box>
                )}
            </Box>
            {!offers || offers?.length <= 0 && (
                <Empty
                    title={t('home.notOffers')}
                    image={`https://ssfdpagynvyveoschegx.supabase.co/storage/v1/object/public/assets/${workspace?.id}/not-found.svg`}
                    style={{
                        // top: `${parentHeight / 2}px`,
                        // transform: 'translateY(-100%)',
                        transform: 'translateY(0%)',
                    }}
                />
            )}
        </Section>
    );
};

export default HomeMobile;
