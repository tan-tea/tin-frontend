import { Shop } from 'contexts/vm/shop/domain/Shop';

import { ShopReadModel } from './ShopReadModel';

export class ShopsReadModel {
    readonly shops: Array<ShopReadModel>;

    constructor(shops: Array<Shop>) {
        this.shops = shops.map((shop) => shop.toPrimitives());
    }
}
