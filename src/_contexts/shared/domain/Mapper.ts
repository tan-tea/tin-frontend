export interface Mapper {
    from<T = any, S = any>(source: S): T;
}
