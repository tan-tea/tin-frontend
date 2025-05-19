export interface Mapper {
    from<T, S = any>(source: S): T;
}