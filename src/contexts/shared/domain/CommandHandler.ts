import { Command, } from 'contexts/shared/domain/Command';

export interface CommandHandler<T extends Command> {
    subscribedTo(): Command;
    handle<R = void>(command: T): Promise<R>;
}
