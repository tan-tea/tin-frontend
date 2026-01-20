'use client'

import type { FC } from 'react';

import { useMemo } from 'react';

import type {
    Shop,
    Address,
} from 'shared/models';
import { useNavigation, usePrefetch } from 'shared/hooks';

import { Heading } from 'ui/text';
import { Button, IconButton } from 'ui/button';
import {
    CardRoot,
    CardActionsArea,
    CardContent,
    CardActions,
} from 'ui/card';
import { Store } from 'components/icons';

import StoreLocation from 'features/store/location';
import StoreAvailability from 'features/store/availability';

type StoreCardProps = Readonly<{
    shop: Shop;
}>;

const StoreCard: FC<StoreCardProps> = ({
    shop,
}) => {
    'use memo'
    const {
        name,
        slug,
    } = shop;

    const address = useMemo<Address | null>(
        () => shop.address,
        [shop],
    );

    const { navigate } = useNavigation();
    const { prefetchOnHover } = usePrefetch();

    return (
        <CardRoot rounded='xxxl' className='h-auto bg-light-400 dark:bg-dark-300'>
            <CardActionsArea href={`/store/${slug}` as any}>
                <CardContent className='h-auto'>
                    <div className='flex items-center gap-x-2.5'>
                        <div>
                            <IconButton rounded='xl' variant='outline' color='background'>
                                <Store/>
                            </IconButton>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <Heading level='2'>{name}</Heading>
                            <Heading level='5'>{slug}</Heading>
                        </div>
                    </div>
                </CardContent>
                <CardActions className='grid grid-cols-1 gap-2'>
                    <StoreAvailability shop={shop}/>
                    <StoreLocation address={address!}/>
                    <div className='mt-4'>
                        <Button
                            type='button'
                            variant='outline'
                            color='primary'
                            onMouseEnter={() => prefetchOnHover(`/store/${slug}`)}
                            onClick={() => navigate(`/store/${slug}`)}
                        >
                            Ver productos
                        </Button>
                    </div>
                </CardActions>
            </CardActionsArea>
        </CardRoot>
    );
}

export default StoreCard;
