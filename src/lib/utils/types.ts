export type Currency = 'COP' | 'USD';

export type CacheFactory = (minutes: number) => number;

export type GetCachedFn = <
    TStore extends Map<string, any>,
    TResult,
>(store: TStore, key: string) => TResult | null;

export type SetCachedFn = <
    TData,
    TStore extends Map<string, unknown>,
>(store: TStore, key: string, data: TData, duration?: number) => void;

type BackoffOpts = {
    maximunDelay?: number;
    delay?: number;
};

export type BackoffFn = <
    TData,
    TFunction extends (...args: any[]) => any,
    TArgs extends Parameters<TFunction>,
>(callback: TFunction, args?: TArgs, opts?: BackoffOpts) => Promise<TData | undefined>;
