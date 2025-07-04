import { Command, } from 'contexts/shared/domain/Command';

export interface CommandBus {
    dispatch<R = void>(command: Command): Promise<R>;
}
