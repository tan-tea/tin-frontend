'use client'

import type { FC } from 'react';

import dynamic from 'next/dynamic';

import { Section } from 'ui/layout';

import type {
    CartProps
} from 'pages/cart';

import Titlebar from 'common/titlebar';
import BackButton from 'common/buttons/back-button';

const CartContent = dynamic(
    () => import('features/cart/content'),
    {
        ssr: false,
    },
);

type Props = CartProps;

const CartMobile: FC<Props> = ({
    t,
}) => {
    'use memo'

    return (
        <Section
            aria-label=''
            aria-description='Lorem ipsum'
        >
            <Titlebar
                title='Carrito de compras'
                renderStart={() => (<div><BackButton/></div>)}
            />
            <CartContent/>
        </Section>
    );
}

export default CartMobile;
