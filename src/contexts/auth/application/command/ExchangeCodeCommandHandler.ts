import {
    AuthUrl,
    AuthClientId,
    AuthRedirectURI,
    AuthClientSecret,
    AuthGrantType,
    AuthCode,
} from 'contexts/auth/domain/value-object';
import { ExchangeCode, } from 'contexts/auth/domain/ExchangeCode';
import { ExchangeCodeCommand, } from 'contexts/auth/domain/ExchangeCodeCommand';
import type { AuthRepository, } from 'contexts/auth/domain/AuthRepository';

import { Command, } from 'contexts/shared/domain/Command';
import { CommandHandler, } from 'contexts/shared/domain/CommandHandler';

export class ExchangeCodeCommandHandler implements CommandHandler<ExchangeCodeCommand> {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {}

    subscribedTo(): Command {
        return ExchangeCodeCommand;
    }

    async handle<R = void>(command: ExchangeCodeCommand): Promise<R> {
        const exchangeCode = ExchangeCode.create(
            new AuthUrl(command.url),
            new AuthClientId(command.clientId),
            new AuthClientSecret(command.clientSecret),
            new AuthGrantType(command.grantType),
            new AuthRedirectURI(command.redirectURI),
            new AuthCode(command.code),
        );

        const accessToken = await this.authRepository.exchangeCode(exchangeCode);
        return accessToken as R;
    }
}
