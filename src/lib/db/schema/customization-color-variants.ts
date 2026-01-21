import * as p from 'drizzle-orm/pg-core';

import { sql, relations } from 'drizzle-orm';

import { customizationColors } from './customization-colors';

export const customizationColorVariants = p.pgTable(
    'customization_color_variants',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        code: p.text('code').notNull(),
        hex: p.text('hex').notNull(),
        r: p.smallint('r').default(0),
        g: p.smallint('g').default(0),
        b: p.smallint('b').default(0),
        a: p.smallint('a').default(255),
        isMain: p.boolean('is_main').default(false),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        colorId: p.uuid('color_id')
            .notNull()
            .references(() => customizationColors.id),
    },
    (table) => [
        p.index().on(table.code),
        p.index().on(table.hex),
        p.check('r_range', sql`${table.r} BETWEEN 0 AND 255`),
        p.check('g_range', sql`${table.g} BETWEEN 0 AND 255`),
        p.check('b_range', sql`${table.b} BETWEEN 0 AND 255`),
        p.check('a_range', sql`${table.a} BETWEEN 0 AND 255`),
    ],
);

export const customizationColorVariantsRelations = relations(customizationColorVariants, ({ one }) => ({
    color: one(customizationColors, {
        fields: [customizationColorVariants.colorId],
        references: [customizationColors.id],
    }),
}));
