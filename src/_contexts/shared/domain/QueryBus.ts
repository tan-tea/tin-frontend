import { Query, } from './Query';
import { Result, } from './Result';

export interface QueryBus {
    ask<R extends Result>(query: Query): Promise<R>;
}
