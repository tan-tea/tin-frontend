import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { addresses } from './addresses';
import { geolocations } from './geolocations';
import { workspaces } from './workspaces';
import { schedules } from './schedules';
import { exceptions } from './exceptions';
import { cartItems } from './cart-items';
import { shopOffers } from './shop-offers';
import { schedulingResources } from './scheduling-resources';

export const shops = p.pgTable(
    'shops',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        name: p.text('name').notNull(),
        slug: p.text('slug').notNull(),
        description: p.varchar('description', {
            length: 500,
        }),
        banner: p.text('banner'),
        phone: p.varchar('phone', { length: 15 }),
        isPrimary: p.boolean('is_primary').default(false).notNull(),
        isVerified: p.boolean('is_verified').default(false).notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        addressId: p.uuid('address_id')
            .notNull()
            .references(() => addresses.id),
        geolocationId: p.uuid('geolocation_id')
            .notNull()
            .references(() => geolocations.id),
        workspaceId: p.uuid('workspace_id')
            .notNull()
            .references(() => workspaces.id),
    },
    (table) => [
        p.index().on(table.name),
        p.index().on(table.slug),
    ],
);

export const shopsRelations = relations(shops, ({ one, many }) => ({
    address: one(addresses, {
        fields: [shops.addressId],
        references: [addresses.id],
    }),
    geolocation: one(geolocations, {
        fields: [shops.geolocationId],
        references: [geolocations.id],
    }),
    workspace: one(workspaces, {
        fields: [shops.workspaceId],
        references: [workspaces.id],
    }),
    offers: many(shopOffers),
    schedules: many(schedules),
    exceptions: many(exceptions),
    cartItems: many(cartItems),
    schedulingResources: many(schedulingResources),
}));
