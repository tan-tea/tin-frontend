import { Query, } from 'contexts/shared/domain/Query';
import { Result, } from 'contexts/shared/domain/Result';

export interface QueryHandler<Q extends Query, R extends Result> {
    subscribedTo(): Query;
    handle(query: Q): Promise<R>;
}
