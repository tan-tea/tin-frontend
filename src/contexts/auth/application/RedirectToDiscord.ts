import {
    inject,
    singleton,
} from 'tsyringe';

import { UseCase, } from 'contexts/shared/domain/UseCase';
import type { AuthRepository, } from 'contexts/auth/domain/AuthRepository';

@singleton()
export class RedirectToDiscord implements UseCase<void, void> {
    constructor(
        @inject('AuthRepository') private readonly authRepository: AuthRepository,
    ) {}

    execute(): void {
        const state = this.authRepository.createRandomState();
        return this.authRepository.redirectToDiscord(state);
    }
}
