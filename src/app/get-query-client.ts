import { minutesToMilliseconds } from 'date-fns';
import {
    isServer,
    QueryClient,
    defaultShouldDehydrateQuery,
} from '@tanstack/react-query';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: minutesToMilliseconds(1),
                refetchOnMount: true,
                refetchOnReconnect: true,
                refetchOnWindowFocus: true,
                gcTime: minutesToMilliseconds(10),
                retry: 3,
                retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query)
                    || query.state.status === 'pending',
                shouldRedactErrors: (error) => {
                    return false;
                }
            }
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
