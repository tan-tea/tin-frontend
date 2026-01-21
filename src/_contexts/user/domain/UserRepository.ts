export interface UserRepository {
    findCurrentUser(): Promise<any>;
}
