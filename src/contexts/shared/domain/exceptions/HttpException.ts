export class HttpException extends Error {
    constructor(...args: Array<any>) {
        super(...args);

        Object.setPrototypeOf(this, HttpException.prototype);
    }
}
