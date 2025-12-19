'use client'

import type { FC } from 'react';

import { useMemo } from 'react';

import type {
    Shop,
    Schedule,
} from 'shared/models';

import { Heading } from 'ui/text';
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

    const currentSchedule = useMemo<Schedule | null>(
        () => {
            const now = new Date();
            const today = now.getDay();
            return shop.schedules.find(s => s.dayOfWeek === today) ?? null;
        },
        [shop]
    );

    console.log('currentSchedule', currentSchedule);

    return (
        <CardRoot className='h-auto rounded-2xl bg-light-400 dark:bg-dark-300'>
            <CardActionsArea href={`/store/${slug}` as any}>
                <CardContent className='h-auto'>
                    <div className='flex items-center gap-x-4'>
                        <div className='p-2.5 border rounded-full'>
                            <Icon value={Store}/>
                        </div>
                        <div>
                            <Heading level='3'>{name}</Heading>
                        </div>
                    </div>
                </CardContent>
                <CardActions className='grid grid-cols-3 gap-1'>
                    <StoreAvailability schedule={currentSchedule}/>
                    <StoreAvailability schedule={currentSchedule}/>
                    <StoreAvailability schedule={currentSchedule}/>
                </CardActions>
            </CardActionsArea>
        </CardRoot>
    );
}

export default StoreCard;
