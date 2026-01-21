import { UserRepository, } from 'contexts/user/domain/UserRepository';

export class HttpUserRepository implements UserRepository {
    constructor() {}

    async findCurrentUser(): Promise<any> {
        return {};
    }
}
