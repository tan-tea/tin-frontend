declare module '*.css';

type HiddenId<T> = T & {
    _id: string;
};

type Cursor = {
    id: string;
    updatedAt: string;
};

type CursorPagination = {
    limit?: number;
    cursor?: Cursor;
};

type PaginatedResult<T> = {
  items: T[];
  nextCursor: OfferCursor | null;
};
