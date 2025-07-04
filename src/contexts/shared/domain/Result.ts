export interface Result<D = any, E = any> {
    data: D | null;
    error: E | null;
}
