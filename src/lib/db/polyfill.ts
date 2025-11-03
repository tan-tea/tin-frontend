import { indexedDB, IDBKeyRange, } from 'fake-indexeddb';

declare global {
    var indexedDB: typeof indexedDB;
    var IDBKeyRange: typeof IDBKeyRange;
}

if (
    typeof window === 'undefined' ||
    !window.indexedDB
) {
    globalThis.indexedDB = indexedDB;
    globalThis.IDBKeyRange = IDBKeyRange;
}
