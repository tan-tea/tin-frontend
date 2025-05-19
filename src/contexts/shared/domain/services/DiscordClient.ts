import { DiscordUser, } from 'contexts/shared/domain/models';

export interface DiscordClient {
    getCurrentUser(token: string): Promise<DiscordUser>;
    getUserById(
        id: string,
        token: string,
    ): Promise<DiscordUser>;
}
