import {
    AuthUrl,
    AuthClientId,
    AuthRedirectURI,
    AuthClientSecret,
    AuthGrantType,
    AuthCode,
} from 'contexts/auth/domain/value-object';

import { AggregateRoot, } from 'contexts/shared/domain/AggregateRoot';

export class ExchangeCode extends AggregateRoot {
    readonly url: AuthUrl;
    readonly clientId: AuthClientId;
    readonly clientSecret: AuthClientSecret;
    readonly grantType: AuthGrantType;
    readonly redirectURI: AuthRedirectURI;
    readonly code: AuthCode;

    constructor(
        url: AuthUrl,
        clientId: AuthClientId,
        clientSecret: AuthClientSecret,
        grantType: AuthGrantType,
        redirectURI: AuthRedirectURI,
        code: AuthCode,
    ) {
        super();

        this.url = url;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.grantType = grantType
        this.redirectURI = redirectURI;
        this.code = code;
    }

    static create(
        url: AuthUrl,
        clientId: AuthClientId,
        clientSecret: AuthClientSecret,
        grantType: AuthGrantType,
        redirectURI: AuthRedirectURI,
        code: AuthCode,
    ): ExchangeCode {
        return new ExchangeCode(
            url,
            clientId,
            clientSecret,
            grantType,
            redirectURI,
            code,
        );
    }

    static fromPrimitives(primitives: any): ExchangeCode {
        return new ExchangeCode(
            new AuthUrl(primitives.url),
            new AuthClientId(primitives.clientId),
            new AuthClientSecret(primitives.clientSecret),
            new AuthGrantType(primitives.grantType),
            new AuthRedirectURI(primitives.redirectURI),
            new AuthCode(primitives.code),
        );
    }

    toPrimitives(): Record<string, unknown> {
        return {
            url: this.url.value,
            clientId: this.clientId.value,
            clientSecret: this.clientSecret.value,
            grantType: this.grantType.value,
            redirectURI: this.redirectURI.value,
            code: this.code.value,
        };
    }
}
