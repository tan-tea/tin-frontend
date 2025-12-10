'use client'

import type {
    FC,
} from 'react';
import {
    tv,
    type VariantProps,
} from 'tailwind-variants';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';

import { cn } from 'lib/utils';

import type {
    Offer
} from 'shared/models';
import { useLocalStorage } from 'shared/hooks';

import {
    List,
    Grid,
    Fullscreen,
} from 'icons/index';
import {
    Box,
    Typography,
} from 'ui/index';
import { Toggle } from 'ui/toggle';
import { ToggleGroup } from 'ui/toggle-group';

import ProductCardSkeleton from 'common/ProductCard/skeleton';
import { Heading } from 'ui/text';

const ProductCard = dynamic(
    () => import('common/ProductCard'),
    {
        loading: () => <ProductCardSkeleton/>
    },
);

const list = tv({
    slots: {
        root: cn('size-full flex flex-col gap-y-2'),
        actions: cn('flex items-center'),
        actionsTitle: cn('font-nunito font-bold text-lg leading-5'),
        list: cn('size-full'),
    },
    variants: {
        view: {
            list: {
                list: cn(
                    'flex flex-col gap-y-2',
                    'md:grid md:grid-cols-2 gap-4',
                ),
            },
            grid: {
                list: cn(
                    'grid grid-cols-2 gap-x-2 gap-y-2',
                    'md:grid-cols-4 md:grap-x-4 md:gap-y-4'
                ),
            },
            complete: {
                list: cn('flex flex-col gap-y-4'),
            },
        },
    },
});

type ListVariants = VariantProps<typeof list>;

type OfferListProps = ListVariants & {
    offers?: Array<Offer>;
    loading?: boolean;
};

const OfferList: FC<OfferListProps> = ({
    offers = [],
    loading = false,
}) => {
    'use memo'
    const {
        root,
        actions,
        actionsTitle,
        list: rootList,
    } = list();

    const t = useTranslations();

    const [ view, setView ] = useLocalStorage<ListVariants['view']>('list', 'grid');

    const handleViewChange = (value: Array<any>) => {
        const [ newView, ] = value;

        if (!newView) setView('grid')
        else setView(newView);
    };

    return (
        <Box
            component={motion.div}
            className={root()}
        >
            <Box className={actions()}>
                <Heading
                    role='feed'
                    aria-label='heading'
                >
                    {t('offers')}
                </Heading>
                <ToggleGroup
                    value={[view]}
                    onValueChange={handleViewChange}
                    className='ml-auto'
                >
                    <Toggle selected={view === 'list'} value='list' icon={List}/>
                    <Toggle selected={view === 'grid'} value='grid' icon={Grid}/>
                    <Toggle selected={view === 'complete'} value='complete' icon={Fullscreen}/>
                </ToggleGroup>
            </Box>
            <Box className={rootList({
                view,
            })}>
                {!loading && (offers && offers?.length > 0)
                    ? offers?.map?.(offer => (
                        <ProductCard
                            showDescription
                            offer={offer}
                            variant={view}
                            key={offer?.title}
                            size={offer?.discount > 0 ? 'sm' : 'md'}
                        />
                    ))
                    : <>No hay productos</>
                }
            </Box>
        </Box>
    );
}

export default OfferList;
