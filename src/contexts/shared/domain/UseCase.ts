export interface UseCase<P = any, R = any> {
    execute(param?: P): Promise<R> | R;
}
