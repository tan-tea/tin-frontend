import { AggregateRoot } from 'contexts/shared/domain/AggregateRoot';
import { Timestamp } from 'contexts/shared/domain/value-object/Timestamp';
import { ExternalId } from 'contexts/shared/domain/value-object/ExternalId';

import { OfferId } from './value-object/OfferId';
import { OfferTitle } from './value-object/OfferTitle';
import { OfferDescription } from './value-object/OfferDescription';
import { OfferBanner } from './value-object/OfferBanner';
import { OfferPrice } from './value-object/OfferPrice';
import { OfferStock } from './value-object/OfferStock';
import { OfferDiscount } from './value-object/OfferDiscount';
import { OfferStartDate } from './value-object/OfferStartDate';
import { OfferEndDate } from './value-object/OfferEndDate';
import { OfferIsActive } from './value-object/OfferIsActive';

export interface OfferPrimitives {
    id: string;
    title: string;
    description: string;
    banner: string;
    price: number;
    stock: number;
    discount: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
    shopId: string;
    typeId: string;
}

export class Offer extends AggregateRoot {
    readonly id: OfferId;
    readonly title: OfferTitle;
    readonly description: OfferDescription;
    readonly banner: OfferBanner;
    readonly price: OfferPrice;
    readonly stock: OfferStock;
    readonly discount: OfferDiscount;
    readonly startDate: OfferStartDate;
    readonly endDate: OfferEndDate;
    readonly isActive: OfferIsActive;
    readonly createdAt: Timestamp;
    readonly updatedAt: Timestamp;
    readonly categoryId: ExternalId;
    readonly shopId: ExternalId;
    readonly typeId: ExternalId;

    constructor(
        id: OfferId,
        title: OfferTitle,
        description: OfferDescription,
        banner: OfferBanner,
        price: OfferPrice,
        stock: OfferStock,
        discount: OfferDiscount,
        startDate: OfferStartDate,
        endDate: OfferEndDate,
        isActive: OfferIsActive,
        createdAt: Timestamp,
        updatedAt: Timestamp,
        categoryId: ExternalId,
        shopId: ExternalId,
        typeId: ExternalId,
    ) {
        super();

        this.id = id;
        this.title = title;
        this.description = description;
        this.banner = banner;
        this.price = price;
        this.stock = stock;
        this.discount = discount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.categoryId = categoryId;
        this.shopId = shopId;
        this.typeId = typeId;
    }

    static fromPrimitives(primitives: OfferPrimitives): Offer {
        return new Offer(
            new OfferId(primitives.id),
            new OfferTitle(primitives.title),
            new OfferDescription(primitives.description),
            new OfferBanner(primitives.banner),
            new OfferPrice(primitives.price),
            new OfferStock(primitives.stock),
            new OfferDiscount(primitives.discount),
            new OfferStartDate(primitives.startDate),
            new OfferEndDate(primitives.endDate),
            new OfferIsActive(primitives.isActive),
            new Timestamp(primitives.createdAt),
            new Timestamp(primitives.updatedAt),
            new ExternalId(primitives.categoryId),
            new ExternalId(primitives.shopId),
            new ExternalId(primitives.typeId),
        );
    }

    toPrimitives(): OfferPrimitives {
        return {
            id: this.id.value,
            title: this.title.value,
            description: this.description.value,
            banner: this.banner.value,
            price: this.price.value,
            stock: this.stock.value,
            discount: this.discount.value,
            startDate: this.startDate.value,
            endDate: this.endDate.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt.value,
            updatedAt: this.updatedAt.value,
            categoryId: this.categoryId.value,
            shopId: this.shopId.value,
            typeId: this.typeId.value,
        };
    }
}
