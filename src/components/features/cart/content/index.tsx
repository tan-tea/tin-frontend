'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import { useAtomValue } from 'jotai';

import { cartAtom } from 'shared/state';

import { Wrapper } from 'ui/layout';

// const OfferList = dynamic(
//     () => import('features/offer/list'),
//     {
//         ssr: false,
//     },
// );

type Props = Readonly<object>;

const CartContent: FC<Props> = () => {
    'use memo'
    const cart = useAtomValue(cartAtom);

    // if (!cart) return null;

    return (
        <Wrapper className='flex flex-col'>
            {JSON.stringify(cart)}
        </Wrapper>
    );
};

export default CartContent;
