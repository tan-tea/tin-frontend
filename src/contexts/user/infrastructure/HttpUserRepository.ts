import {
    inject,
    injectable,
} from 'tsyringe';

import type {
    DiscordClient,
} from 'contexts/shared/domain/services/DiscordClient';
import { DiscordUser, } from 'contexts/shared/domain/models';
import { UserRepository, } from 'contexts/user/domain/UserRepository';

@injectable()
export class HttpUserRepository implements UserRepository {
    constructor(
        @inject('DiscordClient') private readonly discordClient: DiscordClient,
    ) {}

    async getDiscordCurrentUser(token: string): Promise<DiscordUser> {
        const user = await this.discordClient.getCurrentUser(token);
        return user;
    }
}
