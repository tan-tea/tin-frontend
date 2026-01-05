import { CartItem } from './cart-item';

export type CartStatus = 'open' | 'submitted' | 'paid';

export interface Cart {
    id: string;
    userId: string | null;
    status: CartStatus;
    createdAt: Date;
    items: Array<CartItem>;
}
