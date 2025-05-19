import { v4 as uuidv4, } from 'uuid';

import type {
    HttpOptions,
    HttpRequest,
} from 'lib/http/types';
import { DEFAULT_HTTP_OPTIONS, } from 'lib/http/constants';

const retries = new Map<string, any>();

async function request<T>(
    params: HttpRequest
): Promise<T> {
    const {
        id: uid,
        url,
        body,
        requestMethod,
        options: {
            retry,
            retryCount,
            retryDelay,
            ...rest
        },
    } = params;

    try {
        const response = await fetch(url, {
            method: requestMethod,
            body: body && JSON.stringify(body),
            ...rest,
        });

        if (!response.ok && response.status !== 404) throw new Error('Bad response');

        retries.delete(uid);

        const contentType = response?.headers?.get('content-type') || '';
        return contentType?.includes('application/json')
            ? ((await response.json()) as T)
            : ((await response.text()) as T);
    } catch (err: any) {
        const currentRetry = retries.get(uid);

        if (retry && currentRetry && currentRetry?.retryCount > 0) {
            retries.set(uid, {
                ...currentRetry,
                retryCount: currentRetry?.retryCount - 1,
            });

            await new Promise((resolve) => setTimeout(resolve, retryDelay));

            return request(params);
        }

        retries.delete(uid);

        throw new Error(`Something went wrong. Request failed. Err: ${err?.message}`);
    }
};

async function get<T>(
    url: string,
    options?: HttpOptions
): Promise<T> {
    const uid = uuidv4();

    const controller = new AbortController();
    const signal = controller.signal;

    const params = {
        ...DEFAULT_HTTP_OPTIONS,
        ...options,
        signal,
    };

    retries.set(uid, {
        url,
        retryCount: params?.retryCount,
    });

    return request({
        url,
        id: uid,
        body: undefined,
        requestMethod: 'GET',
        options: params,
    });
}

async function post<T>(
    url: string,
    body: any,
    options?: HttpOptions
): Promise<T> {
    const uid = uuidv4();

    const controller = new AbortController();
    const signal = controller.signal;

    const params = {
        ...DEFAULT_HTTP_OPTIONS,
        ...options,
        signal,
    };

    retries.set(uid, {
        url,
        retryCount: params?.retryCount,
    });

    return request({
        url,
        id: uid,
        body,
        requestMethod: 'POST',
        options: params,
    });
}

async function put<T>(
    url: string,
    body: any,
    options?: HttpOptions
): Promise<T> {
    const uid = uuidv4();

    const controller = new AbortController();
    const signal = controller.signal;

    const params = {
        ...DEFAULT_HTTP_OPTIONS,
        ...options,
        signal,
    };

    retries.set(uid, {
        url,
        retryCount: params?.retryCount,
    });

    return request({
        url,
        id: uid,
        body,
        requestMethod: 'PUT',
        options: params,
    });
}

async function patch<T>(
    url: string,
    body: any,
    options?: HttpOptions
): Promise<T> {
    const uid = uuidv4();

    const controller = new AbortController();
    const signal = controller.signal;

    const params = {
        ...DEFAULT_HTTP_OPTIONS,
        ...options,
        signal,
    };

    retries.set(uid, {
        url,
        retryCount: params?.retryCount,
    });

    return request({
        url,
        id: uid,
        body,
        requestMethod: 'PATCH',
        options: params,
    });
}

export {
    get,
    post,
    put,
    patch,
};

