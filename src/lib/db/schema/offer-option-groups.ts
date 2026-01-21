import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { offers } from './offers';
import { optionGroups } from './option-groups';

export const offerOptionGroups = p.pgTable(
    'offer_option_groups',
    {
        offerId: p.uuid('offer_id')
            .notNull()
            .references(() => offers.id, { onDelete: 'cascade' }),
        optionGroupId: p.uuid('option_group_id')
            .notNull()
            .references(() => optionGroups.id, { onDelete: 'cascade' }),
        sortOrder: p.smallint('sort_order').default(0),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        p.primaryKey({
            columns: [
                table.offerId,
                table.optionGroupId,
            ],
        }),
    ],
);

export const offerOptionGroupsRelations = relations(offerOptionGroups, ({}) => ({

}));
