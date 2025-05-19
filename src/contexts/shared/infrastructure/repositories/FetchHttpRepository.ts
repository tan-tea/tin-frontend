import { v4 as uuidv4, } from 'uuid';
import { injectable, } from 'tsyringe';

import { HttpException, } from 'contexts/shared/domain/exceptions/HttpException';
import { HttpRepository, } from 'contexts/shared/domain/repositories/HttpRepository';

@injectable()
export class FetchHttpRepository implements HttpRepository {
    private readonly retries: Map<string, any> = new Map();

    private readonly defaultOptions: RequestInit & Record<string, any> = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        retry: true,
        retryCount: 1,
        retryDelay: 1000,
    };

    async get<T>(
        url: string,
        options?: RequestInit & Record<string, any>,
    ): Promise<T> {
        const uid = uuidv4();

        const controller = new AbortController();
        const signal = controller.signal;

        const {
            retry,
            retryCount,
            retryDelay,
        } = {
            ...this.defaultOptions,
            ...options,
        };

        this.retries.set(uid, { url, retryCount, });

        const httpGet = async (): Promise<T> => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    ...options,
                    signal,
                });

                if (!response.ok && response.status !== 404) throw new HttpException('Bad response');

                this.retries.delete(uid);

                const contentType = response?.headers?.get('content-type') || '';
                return contentType?.includes('application/json')
                    ? (await response.json()) as T
                    : (await response.text()) as T;
            } catch (err: any) {
                const currentRetry = this.retries.get(uid);

                if (retry && currentRetry && currentRetry?.retryCount > 0) {
                    this.retries.set(uid, {
                        ...currentRetry,
                        retryCount: currentRetry?.retryCount - 1,
                    });

                    await new Promise((resolve) => setTimeout(resolve, retryDelay));

                    return httpGet();
                }

                this.retries.delete(uid);

                throw new HttpException(`Something went wrong. Request failed. Err: ${err?.message}`);
            }
        }

        return httpGet();
    }

    async getAll<T>(
        url: string,
        options?: RequestInit & Record<string, any>
    ): Promise<Array<T>> {
        const results: Array<T> = [];

        let target: string = url;

        while (true) {
            const response = await this.get<T>(target, options) as any;
            if (!response?.d?.results) break;

            results.push(...response);

            target = response?.d?.__next;
        }

        return results;
    }

    async post<T>(
        url: string,
        body: any,
        options?: RequestInit & Record<string, any>
    ): Promise<T> {
        const uid = uuidv4();

        const {
            retry,
            retryCount,
            retryDelay,
        } = {
            ...this.defaultOptions,
            ...options,
        };

        this.retries.set(uid, { url, retryCount, });

        const httpPost = async (): Promise<T> => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: body && JSON.stringify(body),
                    ...options,
                });

                if (!response.ok && response?.status !== 404) throw new HttpException('Bad response');

                this.retries.delete(uid);

                const contentType = response?.headers?.get('content-type') || '';
                return contentType?.includes('application/json')
                    ? (await response.json()) as T
                    : (await response.text()) as T;
            } catch (err: any) {
                const currentRetry = this.retries.get(uid);

                if (retry && currentRetry && currentRetry?.retryCount > 0) {
                    this.retries.set(uid, {
                        ...currentRetry,
                        retryCount: currentRetry?.retryCount - 1,
                    })

                    await new Promise((resolve) => setTimeout(resolve, retryDelay));

                    return await httpPost();
                }

                this.retries.delete(uid);

                throw new HttpException(`Something went wrong. Request failed. Err: ${err?.message}`);
            }
        }

        const response = await httpPost();
        return response;
    }

    async put<T>(
        url: string,
        body: any,
        options?: RequestInit & Record<string, any>
    ): Promise<T> {
        const uid = uuidv4();

        const {
            retry,
            retryCount,
            retryDelay,
        } = {
            ...this.defaultOptions,
            ...options,
        };

        this.retries.set(uid, { url, retryCount, });

        const httpPut = async (): Promise<T> => {
            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    body: body && JSON.stringify(body),
                    ...options,
                });

                if (!response.ok && response?.status !== 404) throw new HttpException('Bad response');

                this.retries.delete(uid);

                const contentType = response?.headers?.get('content-type') || '';
                return contentType?.includes('application/json')
                    ? (await response.json()) as T
                    : (await response.text()) as T;
            } catch (err: any) {
                const currentRetry = this.retries.get(uid);

                if (retry && currentRetry && currentRetry?.retryCount > 0) {
                    this.retries.set(uid, {
                        ...currentRetry,
                        retryCount: currentRetry?.retryCount - 1,
                    })

                    await new Promise((resolve) => setTimeout(resolve, retryDelay));

                    return httpPut();
                }

                this.retries.delete(uid);

                throw new HttpException(`Something went wrong. Request failed. Err: ${err?.message}`);
            }
        }

        return httpPut();
    }

    async patch<T>(
        url: string,
        body: any,
        options?: RequestInit & Record<string, any>
    ): Promise<T> {
        const uid = uuidv4();

        const {
            retry,
            retryCount,
            retryDelay,
        } = {
            ...this.defaultOptions,
            ...options,
        };

        this.retries.set(uid, { url, retryCount, });

        const httpPatch = async (): Promise<T> => {
            try {
                const response = await fetch(url, {
                    method: 'PATCH',
                    body: body && JSON.stringify(body),
                    ...options,
                });

                if (!response.ok && response?.status !== 404) throw new HttpException('Bad response');

                this.retries.delete(uid);

                const contentType = response?.headers?.get('content-type') || '';
                return contentType?.includes('application/json')
                    ? (await response.json()) as T
                    : (await response.text()) as T;
            } catch (err: any) {
                const currentRetry = this.retries.get(uid);

                if (retry && currentRetry && currentRetry?.retryCount > 0) {
                    this.retries.set(uid, {
                        ...currentRetry,
                        retryCount: currentRetry?.retryCount - 1,
                    })

                    await new Promise((resolve) => setTimeout(resolve, retryDelay));

                    return httpPatch();
                }

                this.retries.delete(uid);

                throw new HttpException(`Something went wrong. Request failed. Err: ${err?.message}`);
            }
        }

        return httpPatch();
    }

    async delete<T>(
        url: string,
        options?: RequestInit & Record<string, any>
    ): Promise<T> {
        const uid = uuidv4();

        const {
            retry,
            retryCount,
            retryDelay,
        } = {
            ...this.defaultOptions,
            ...options,
        };

        this.retries.set(uid, { url, retryCount, });

        const httpDelete = async (): Promise<T> => {
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    ...options,
                });

                if (!response.ok && response?.status !== 404) throw new HttpException('Bad response');

                this.retries.delete(uid);

                const contentType = response?.headers?.get('content-type') || '';
                return contentType?.includes('application/json')
                    ? (await response.json()) as T
                    : (await response.text()) as T;
            } catch (err: any) {
                const currentRetry = this.retries.get(uid);

                if (retry && currentRetry && currentRetry?.retryCount > 0) {
                    this.retries.set(uid, {
                        ...currentRetry,
                        retryCount: currentRetry?.retryCount - 1,
                    })

                    await new Promise((resolve) => setTimeout(resolve, retryDelay));

                    return httpDelete();
                }

                this.retries.delete(uid);

                throw new HttpException(`Something went wrong. Request failed. Err: ${err?.message}`);
            }
        }

        return httpDelete();
    }
}
