'use client'

import { Dexie, } from 'dexie';

const DATABASE_NAME: string = 'cache';

const DATABASE_VERSION: number = 1;

const DATABASE_INSTANCE = new Dexie(DATABASE_NAME, {
    autoOpen: true,
});

DATABASE_INSTANCE
    .version(DATABASE_VERSION)
    .stores({
        workspace: 'id',
        users: ',&email,&preferredUsername',
        history: 'key,createdAt',
    });

export {
    DATABASE_NAME,
    DATABASE_VERSION,
    DATABASE_INSTANCE,
};
