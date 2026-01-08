declare module '*.css';

type HiddenId<T> = T & {
    _id: string;
};
