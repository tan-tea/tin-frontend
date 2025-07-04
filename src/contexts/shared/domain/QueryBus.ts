import { Query, } from 'contexts/shared/domain/Query';
import { Result, } from 'contexts/shared/domain/Result';

export interface QueryBus {
    ask<R extends Result>(query: Query): Promise<R>;
}
