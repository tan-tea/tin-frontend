'use client'

import type { FC } from 'react';

import type {
    Cart
} from 'shared/models';
import { useNavigation } from 'shared/hooks';

import {
    Drawer,
    DrawerContent,
    DrawerTitle,
} from 'ui/drawer';

import CartContent from 'features/cart/content';

type Props = Readonly<{ locale: string }>;

const CartDrawer: FC<Props> = ({
    locale
}) => {
    'use memo'
    const {
        router,
        isActivePath,
    } = useNavigation();

    const cartIsActive = isActivePath(`/cart`);

    return (
        <Drawer
            open={cartIsActive}
            onOpenChange={() => cartIsActive && router.back()}
        >
            <DrawerContent className='h-[95%] data-[vaul-drawer-direction=bottom]:max-h-[100dvh]'>
                <div className='size-full overflow-y-auto scrollbar-hide md:scrollbar-default'>
                    <DrawerTitle className='px-4 pt-4'>Carrito de compras</DrawerTitle>
                    <CartContent/>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CartDrawer;
