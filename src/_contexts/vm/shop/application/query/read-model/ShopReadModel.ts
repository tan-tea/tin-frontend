import { Shop, ShopPrimitives } from 'contexts/vm/shop/domain/Shop';

export class ShopReadModel implements ShopPrimitives {
    readonly id: string;
    readonly workspaceId: string;
    readonly name: string;
    readonly isPrimary: boolean;
    readonly isVerified: boolean;
    readonly createdAt: Date;

    constructor(shop: Shop) {
        const primitives = shop.toPrimitives();

        this.id = primitives.id;
        this.workspaceId = primitives.workspaceId;
        this.name = primitives.name;
        this.isPrimary = primitives.isPrimary;
        this.isVerified = primitives.isVerified;
        this.createdAt = primitives.createdAt;
    }
}
