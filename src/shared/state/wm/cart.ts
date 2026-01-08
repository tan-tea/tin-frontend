import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import db from 'lib/db';

import type { Cart, CartItem } from 'shared/models';

export const cartBaseAtom = atom<Cart>({
    id: crypto.randomUUID(),
    userId: null,
    status: 'open',
    createdAt: new Date(),
    items: [],
});

export const cartAtom = atom(
    (get) => get(cartBaseAtom),
    (_, set, newCart: Cart) => {
        set(cartBaseAtom, newCart);
    },
);

export const loadCartAtom = atom(
    null,
    async (_get, set) => {
        const stored = await db.table<Cart>('carts').get('current');

        if (stored) {
            set(cartBaseAtom, stored);
        }
    },
);

export const cachedCartAtom = atom(
    null,
    async (get, set, cart: Cart) => {
        await db.table<HiddenId<Cart>>('carts').put({
            ...cart,
            id: 'current',
            _id: cart.id,
        });

        set(cartBaseAtom, cart);

        const queryClient = get(queryClientAtom);
        queryClient.setQueryData(['cart'], cart);
    },
);

export const addToCartAtom = atom(
    null,
    (get, set, newCartItem: CartItem) => {
        const currentCart = get(cartAtom);

        const existingItem = currentCart.items.find(
            item => item.offerId === newCartItem.offerId
        );

        if (existingItem) {
            set(cachedCartAtom, {
                ...currentCart,
                items: currentCart.items.map(item =>
                    item.id === existingItem.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        totalPrice: item.totalPrice + newCartItem.totalPrice
                        }
                    : item
                ),
            });
        } else {
            set(cachedCartAtom, {
                ...currentCart,
                items: [...currentCart.items, newCartItem]
            });
        }
    },
);

export const cartItemsCountAtom = atom(async (get) => {
    const cart = get(cartAtom);
    return cart.items.length ?? 0;
});

export const cartItemsTotalPriceAtom = atom(async (get) => {
    const cart = get(cartAtom);

    const items = cart.items;
    if (!items) return 0;

    let total = items.reduce(
        (sum, item) => sum + (item.totalPrice ?? 0),
        0
    );

    return total;
});
