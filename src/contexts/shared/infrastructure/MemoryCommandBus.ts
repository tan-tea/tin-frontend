import { Command, } from 'contexts/shared/domain/Command';
import { CommandBus, } from 'contexts/shared/domain/CommandBus';
import { CommandHandlers, } from 'contexts/shared/infrastructure/CommandHandlers';

export class MemoryCommandBus implements CommandBus {
    constructor(
        private readonly commandHandlers: CommandHandlers,
    ) {}

    async dispatch<R = void>(command: Command): Promise<R> {
        const commandHandler = this.commandHandlers.get(command);
        if (!commandHandler) {
            throw new Error('Command handler not found');
        }

        return commandHandler.handle<R>(command);
    }
}
