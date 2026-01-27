import * as p from 'drizzle-orm/pg-core';

import { sql, relations } from 'drizzle-orm';

import { shops } from './shops';
import { categories } from './categories';
import { subcategories } from './subcategories';
import { workspaces } from './workspaces';
import { shopOffers } from './shop-offers';
import { offerImages } from './offer-images';
import { cartItems } from './cart-items';
import { appointments } from './appointments';
import { offerOptionGroups } from './offer-option-groups';

export const offers = p.pgTable(
    'offers',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        type: p.text('type', {
            enum: ['product', 'service'],
        }).default('product').notNull(),
        schedulingType: p.text('scheduling_type', {
            enum: ['provider', 'capacity'],
        }),
        duration: p.smallint('duration'),
        title: p.text('title').notNull(),
        slug: p.text('slug').notNull(),
        description: p.varchar('description', {
            length: 2500,
        }),
        banner: p.text('banner').notNull(),
        price: p.numeric('price', { precision: 12, scale: 2 }).notNull(),
        stock: p.integer('stock').default(0),
        discount: p.smallint('discount').default(0).notNull(),
        startDate: p.timestamp('start_date').defaultNow().notNull(),
        endDate: p.timestamp('end_date')
            .$default(() => new Date(9999, 11, 31))
            .notNull(),
        isActive: p.boolean('is_active').default(true),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        categoryId: p.uuid('category_id')
            .notNull()
            .references(() => categories.id),
        subcategoryId: p.uuid('subcategory_id')
            .references(() => subcategories.id),
        shopId: p.uuid('shop_id') //TODO: pending to remove?
            .references(() => shops.id),
        workspaceId: p.uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [
        p.index().on(table.title),
        p.index().on(table.slug),
        p.index().on(table.startDate),
        p.index().on(table.endDate),
        p.check('discount_range', sql`${table.discount} BETWEEN 0 AND 100`),
    ],
);

export const offersRelations = relations(offers, ({ one, many }) => ({
    category: one(categories, {
        fields: [offers.categoryId],
        references: [categories.id],
    }),
    subcategory: one(subcategories, {
        fields: [offers.subcategoryId],
        references: [subcategories.id],
    }),
    workspace: one(workspaces, {
        fields: [offers.workspaceId],
        references: [workspaces.id],
    }),
    offers: many(shopOffers),
    images: many(offerImages),
    optionGroups: many(offerOptionGroups),
    cartItems: many(cartItems),
    appointments: many(appointments),
}));
