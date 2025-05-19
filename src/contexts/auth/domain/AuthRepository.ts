export interface AuthRepository {
    redirectToDiscord(state: string): void;
    exchangeDiscordCode(code: string): Promise<any>;
    createRandomState(length?: number): string;
}
