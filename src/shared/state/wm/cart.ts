import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

import db from 'lib/dexie';

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
    (_, set, customization: Cart) => set(cartBaseAtom, customization),
);

export const loadCartAtom = atom(
    null,
    async (_, set) => {
        const stored = await db.table<Cart>('carts').get('current');
        if (stored) set(cartBaseAtom, stored);
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

export const addItemToCartAtom = atom(
    null,
    (get, set, newCartItem: CartItem) => {
        const currentCart = get(cartBaseAtom);

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
                    } : item
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

export const removeItemFromCartAtom = atom(
    null,
    (get, set, id: string) => {
        const currentCart = get(cartBaseAtom);

        const existingItem = currentCart.items.find(
            item => item.id === id
        );

        if (!existingItem) return;

        set(cachedCartAtom, {
            ...currentCart,
            items: [...currentCart.items.filter(item => item.id !== existingItem.id)],
        });
    },
);

export const cartItemsCountAtom = atom((get) => {
    return get(cartBaseAtom).items.length ?? 0;
});

export const cartItemsTotalPriceAtom = atom((get) => {
    return get(cartBaseAtom).items.reduce(
        (sum, item) => sum + (item.totalPrice ?? 0),
        0
    );
});
