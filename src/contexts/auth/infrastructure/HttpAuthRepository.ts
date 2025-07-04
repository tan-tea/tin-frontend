import {
    redirect,
    RedirectType,
} from 'next/navigation';

import { post, } from 'lib/http';

import { Auth, } from 'contexts/auth/domain/Auth';
import { ExchangeCode, } from 'contexts/auth/domain/ExchangeCode';
import type { AuthRepository, } from 'contexts/auth/domain/AuthRepository';

import { UrlBuilder, } from 'contexts/shared/infrastructure/builders/UrlBuilder';

export class HttpAuthRepository implements AuthRepository {
    constructor() {}

    async authorize(auth: Auth): Promise<void> {
        const endpoint = new UrlBuilder(auth.url.value, '')
            // .withParam('force_reauth=true')
            .withParam(`client_id=${auth.clientId.value}`)
            .withParam(`redirect_uri=${auth.redirectURI.value}`)
            .withParam(`response_type=${auth.responseType.value}`)
            .withParam(`scope=${auth.scope.value}`)
            .withParam(`state=${auth.state.value}`)
            .build();

        redirect(endpoint, RedirectType.replace);
    }

    async exchangeCode(code: ExchangeCode): Promise<any> {
        const endpoint = new UrlBuilder('/api', 'auth')
            .build();

        const response = await post<any>(endpoint, {
            url: code.url.value,
            clientId: code.clientId.value,
            clientSecret: code.clientSecret.value,
            grantType: code.grantType.value,
            redirectURI: code.redirectURI.value,
            code: code.code.value,
        });

        return response.data.access_token;
    }
}
