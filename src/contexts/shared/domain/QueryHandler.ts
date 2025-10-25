import { Query, } from './Query';
import { Result, } from './Result';

export interface QueryHandler<Q extends Query, R extends Result> {
    subscribedTo(): Query;
    handle(query: Q): Promise<R>;
}
