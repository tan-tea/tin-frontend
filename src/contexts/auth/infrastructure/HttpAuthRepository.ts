'use client'

import {
    inject,
    injectable,
} from 'tsyringe';

import { AuthRepository, } from 'contexts/auth/domain/AuthRepository';
import { UrlBuilder, } from 'contexts/shared/infrastructure/builders/UrlBuilder';
import type { HttpRepository, } from 'contexts/shared/domain/repositories/HttpRepository';

@injectable()
export class HttpAuthRepository implements AuthRepository {
    constructor(
        @inject('HttpRepository') private readonly httpRepository: HttpRepository,
    ) {}

    redirectToDiscord(state: string): void {
        const endpoint = new UrlBuilder(process.env.NEXT_PUBLIC_DISCORD_URL!, 'oauth2/authorize')
            .withParam('response_type=token')
            .withParam(`client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}`)
            .withParam(`state=${state}`)
            .withParam(`scope=${process.env.NEXT_PUBLIC_DISCORD_SCOPE}`)
            .withParam(`redirect_uri=${process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI}`)
            .build();

        window.open(endpoint, '_self');
    }

    exchangeDiscordCode(code: string): Promise<any> {
        throw new Error('Method not implemented.');
    }

    createRandomState(length: number = 32): string {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const randomValues = new Uint8Array(length);
        crypto.getRandomValues(randomValues);

        return Array.from(randomValues)
            .map(byte => charset[byte % charset?.length])
            .join('');
    }
}
