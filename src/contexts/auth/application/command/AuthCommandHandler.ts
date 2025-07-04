import {
    AuthUrl,
    AuthState,
    AuthScope,
    AuthClientId,
    AuthRedirectURI,
    AuthResponseType,
} from 'contexts/auth/domain/value-object';
import { Auth, } from 'contexts/auth/domain/Auth';
import { AuthCommand, } from 'contexts/auth/domain/AuthCommand';
import type { AuthRepository, } from 'contexts/auth/domain/AuthRepository';

import { Command, } from 'contexts/shared/domain/Command';
import { CommandHandler, } from 'contexts/shared/domain/CommandHandler';

export class AuthCommandHandler implements CommandHandler<AuthCommand> {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    subscribedTo(): Command {
        return AuthCommand;
    }

    async handle<R = void>(command: AuthCommand): Promise<R> {
        const auth = Auth.create(
            new AuthUrl(command.url),
            new AuthState(command.state),
            new AuthScope(command.scope),
            new AuthClientId(command.clientId),
            new AuthRedirectURI(command.redirectURI),
            new AuthResponseType(command.responseType),
        );

        await this.authRepository.authorize(auth);

        return undefined as R;
    }
}
