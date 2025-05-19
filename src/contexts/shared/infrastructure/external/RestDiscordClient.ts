import { injectable, } from 'tsyringe';

import { get, } from 'lib/http';

import { DiscordUser, } from 'contexts/shared/domain/models';
import { DiscordClient, } from 'contexts/shared/domain/services/DiscordClient';

import { UrlBuilder, } from 'contexts/shared/infrastructure/builders/UrlBuilder';

@injectable()
export class RestDiscordClient implements DiscordClient {
    constructor () {}

    async getCurrentUser(token: string): Promise<DiscordUser> {
        const endpoint = new UrlBuilder('/api', 'discord/user')
            .build();

        const response = await get<DiscordUser>(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response;
    }

    async getUserById(
        id: string,
        token: string,
    ): Promise<DiscordUser> {
        throw new Error('Method not implemented.');
    }
}
