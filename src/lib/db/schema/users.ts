import * as p from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';

import { sessions } from './sessions';
import { accounts } from './accounts';
import { workspaces } from './workspaces';
import { carts } from './carts';
import { appointments } from './appointments';

export const users = p.pgTable(
    'users',
    {
        id: p.text('id').primaryKey(),
        name: p.text('name').notNull(),
        email: p.text('email').notNull(),
        emailVerified: p.boolean('email_verified').default(false).notNull(),
        image: p.text('image'),
        createdAt: p.timestamp('created_at').defaultNow().notNull(),
        updatedAt: p.timestamp('updated_at')
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        p.index().on(table.name),
        p.uniqueIndex().on(table.email)
    ],
);

export const usersRelations = relations(users, ({ many, }) => ({
    sessions: many(sessions),
    accounts: many(accounts),
    workspaces: many(workspaces),
    carts: many(carts),
    appointments: many(appointments),
}));
