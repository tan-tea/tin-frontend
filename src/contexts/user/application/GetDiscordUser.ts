import {
    inject,
    singleton,
} from 'tsyringe';

import type {
    UserRepository,
} from 'contexts/user/domain/UserRepository';
import { UseCase, } from 'contexts/shared/domain/UseCase';
import { DiscordUser, } from 'contexts/shared/domain/models';

@singleton()
export class GetDiscordUser implements UseCase<string, DiscordUser> {
    constructor(
        @inject('UserRepository') private readonly userRepository: UserRepository,
    ) {}

    async execute(token: string): Promise<DiscordUser> {
        return await this.userRepository.getDiscordCurrentUser(token);
    }
}
