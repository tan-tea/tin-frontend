import { Command, } from './Command';

export interface CommandHandler<T extends Command> {
    subscribedTo(): Command;
    handle<R = void>(command: T): Promise<R>;
}
