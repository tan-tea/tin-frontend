import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { users } from './users';

export const sessions = p.pgTable(
    'sessions',
    {
        id: p.uuid('id').primaryKey().defaultRandom(),
        expiresAt: p.timestamp('expires_at').notNull(),
        token: p.text('token').unique().notNull(),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
        userId: p.uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (table) => [
        p.index().on(table.userId),
    ],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));
