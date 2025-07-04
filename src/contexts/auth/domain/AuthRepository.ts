import { Auth, } from 'contexts/auth/domain/Auth';
import { ExchangeCode, } from 'contexts/auth/domain/ExchangeCode';

export interface AuthRepository {
    authorize(auth: Auth): Promise<void>;
    exchangeCode(code: ExchangeCode): Promise<string>;
}
