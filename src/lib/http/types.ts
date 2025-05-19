type HttpOptions = RequestInit & {
    retry?: boolean;
    retryCount?: number;
    retryDelay?: number;
};

type HttpRequest = {
    id: string;
    url: string;
    requestMethod: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    options: HttpOptions;
};

export type {
    HttpRequest,
    HttpOptions,
};
