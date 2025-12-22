'use client'

import type { FC } from 'react';

import { useMemo } from 'react';

import type {
    Shop,
    Schedule,
    Address,
} from 'shared/models';

import { Heading, Paragraph } from 'ui/text';
import {
    CardRoot,
    CardActionsArea,
    CardContent,
    CardActions,
} from 'ui/card';
import {
    Icon,
    Store,
} from 'components/icons';

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

    const currentAddress = useMemo<Address | null>(
        () => shop.address,
        [shop],
    );

    const currentSchedule = useMemo<Schedule | null>(
        () => {
            const now = new Date();
            const today = now.getDay();
            return (shop?.schedules ?? [])
                .find(s => s.dayOfWeek === today) ?? null;
        },
        [shop]
    );

    return (
        <CardRoot className='h-auto rounded-2xl bg-light-400 dark:bg-dark-300'>
            <CardActionsArea href={`/store/${slug}` as any}>
                <CardContent className='h-auto'>
                    <div className='flex items-center gap-x-2.5'>
                        <div className='p-2.5 border border-[var(--mui-palette-primary-main)] rounded-full'>
                            <Icon selected value={Store}/>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <Heading level='4'>{name}</Heading>
                            <Paragraph level='5'>{slug}</Paragraph>
                        </div>
                    </div>
                </CardContent>
                <CardActions className='grid grid-cols-2 gap-2'>
                    <StoreAvailability schedule={currentSchedule}/>
                    <StoreLocation address={currentAddress}/>
                </CardActions>
            </CardActionsArea>
        </CardRoot>
    );
}

export default StoreCard;
