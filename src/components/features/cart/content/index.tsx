'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import { useAtomValue } from 'jotai';
import { useFormatter } from 'next-intl';

import {
    cartAtom,
    cartItemsCountAtom,
    cartItemsTotalPriceAtom,
} from 'shared/state';

import { Button } from 'ui/button';
import { Wrapper } from 'ui/layout';
import { Heading, Paragraph } from 'ui/text';

import PriceWithDiscount from 'common/price-with-discount';

type Props = Readonly<object>;

const CartContent: FC<Props> = () => {
    'use memo'
    const format = useFormatter();

    const cart = useAtomValue(cartAtom);
    const cartItemsCount = useAtomValue(cartItemsCountAtom);
    const cartItemsTotalPrice = useAtomValue(cartItemsTotalPriceAtom);

    return (
        <Wrapper position='relative' className='size-full flex flex-col overflow-hidden'>
            <div className='size-full flex flex-col gap-y-2 px-4 py-4'>
                <Paragraph>
                    {cartItemsCount} items
                </Paragraph>
                <ul className='flex flex-col gap-y-4'>
                    {cart.items.map(item => {
                        const groupName = item.options.map(o => o.optionGroupName)?.[0] ?? null;

                        return (
                            <li key={item.id} className='flex flex-col gap-y-1'>
                                <Heading level='3'>
                                    {item.offerTitle}
                                </Heading>
                                {item.options.length > 0 && (
                                    <Paragraph level='4'>
                                        <b>{groupName}</b>: {' '}
                                        {format.list(item.options.map(o => o.optionName))}
                                    </Paragraph>
                                )}
                                <PriceWithDiscount
                                    discount={0}
                                    price={item.totalPrice}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='w-full z-10 fixed bottom-0 px-4 py-4 bg-light-400 dark:bg-dark-300'>
                <div className='flex items-center gap-x-2 mb-2'>
                    <Heading level='2'>
                        Total:
                    </Heading>
                    <PriceWithDiscount
                        discount={0}
                        price={cartItemsTotalPrice}
                    />
                </div>
                <Button>
                    Checkout
                </Button>
            </div>
        </Wrapper>
    );
};

export default CartContent;
