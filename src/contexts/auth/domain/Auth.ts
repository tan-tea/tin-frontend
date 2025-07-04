import {
    AuthUrl,
    AuthState,
    AuthScope,
    AuthClientId,
    AuthRedirectURI,
    AuthResponseType,
} from 'contexts/auth/domain/value-object';

import { AggregateRoot, } from 'contexts/shared/domain/AggregateRoot';

export class Auth extends AggregateRoot {
    readonly url: AuthUrl;
    readonly state: AuthState;
    readonly scope: AuthScope;
    readonly clientId: AuthClientId;
    readonly redirectURI: AuthRedirectURI;
    readonly responseType: AuthResponseType;

    constructor(
        url: AuthUrl,
        state: AuthState,
        scope: AuthScope,
        clientId: AuthClientId,
        redirectURI: AuthRedirectURI,
        responseType: AuthResponseType,
    ) {
        super();

        this.url = url;
        this.state = state;
        this.scope = scope;
        this.clientId = clientId;
        this.redirectURI = redirectURI;
        this.responseType = responseType;
    }

    static create(
        url: AuthUrl,
        state: AuthState,
        scope: AuthScope,
        clientId: AuthClientId,
        redirectURI: AuthRedirectURI,
        responseType: AuthResponseType,
    ): Auth {
        return new Auth(
            url,
            state,
            scope,
            clientId,
            redirectURI,
            responseType,
        );
    }

    static fromPrimitives(primitives: any): Auth {
        return new Auth(
            new AuthUrl(primitives.url as string),
            new AuthState(primitives.state as string),
            new AuthScope(primitives.scope as string),
            new AuthClientId(primitives.clientId as string),
            new AuthRedirectURI(primitives.redirectURI as string),
            new AuthResponseType(primitives.responseType as string),
        );
    }

    toPrimitives(): Record<string, unknown> {
        return {
            url: this.url.value,
            state: this.state.value,
            scope: this.scope.value,
            clientId: this.clientId.value,
            redirectURI: this.redirectURI.value,
            responseType: this.responseType.value,
        };
    }
}
