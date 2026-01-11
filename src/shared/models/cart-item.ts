import { CartItemOption } from './cart-item-option';

export interface CartItem {
    id: string;
    cartId: string;
    shopId: string;
    offerId: string;
    offerTitle: string;
    basePrice: number;
    quantity: number;
    totalPrice: number;
    createdAt: Date;
    options: Array<CartItemOption>;
}
