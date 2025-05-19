import { DiscordUser, } from 'contexts/shared/domain/models';

export interface UserRepository {
    getDiscordCurrentUser(token: string): Promise<DiscordUser>;
}
