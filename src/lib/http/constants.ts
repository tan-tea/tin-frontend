import type { HttpOptions, } from 'lib/http/types';

const DEFAULT_HTTP_OPTIONS: HttpOptions = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    retry: true,
    retryCount: 1,
    retryDelay: 2000,
};

export {
    DEFAULT_HTTP_OPTIONS,
};
