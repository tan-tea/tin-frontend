import { Builder, } from 'contexts/shared/domain/Builder';

export class UrlBuilder implements Builder<string> {
    private url: string;
    private path: string;
    private params: Array<string> = [];

    constructor(
        url: Required<string>,
        path: Required<string>
    ) {
        this.url = url;
        this.path = path;
    }

    withPath(value: Required<string>): this {
        this.path = value;
        return this;
    }

    withParam(value: Required<string>): this {
        this.params.push(value);
        return this;
    }

    build(): string {
        const params: Array<string> = [];

        if (this.params?.length) params.push(this.params.join('&'));

        const queryString = params?.length ? `?${params.join()}` : '';

        const uri = `${this.url}/${this.path}${queryString}`;
        return uri;
    }
}