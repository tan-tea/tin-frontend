import { Offer as OfferAggregate, OfferPrimitives, } from 'contexts/vm/offer/domain/Offer';

export interface Offer extends OfferPrimitives {}

export class OfferReadModel implements Offer {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly banner: string;
    readonly price: number;
    readonly stock: number;
    readonly discount: number;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly categoryId: string;
    readonly shopId: string;
    readonly typeId: string;

    constructor(offer: OfferAggregate) {
        const primitives = offer.toPrimitives();

        this.id = primitives.id;
        this.title = primitives.title;
        this.description = primitives.description;
        this.banner = primitives.banner;
        this.price = primitives.price;
        this.stock = primitives.stock;
        this.discount = primitives.discount;
        this.startDate = primitives.startDate;
        this.endDate = primitives.endDate;
        this.isActive = primitives.isActive;
        this.createdAt = primitives.createdAt;
        this.updatedAt = primitives.updatedAt;
        this.categoryId = primitives.categoryId;
        this.shopId = primitives.shopId;
        this.typeId = primitives.typeId;
    }
}
