import { Command, } from 'contexts/shared/domain/Command';
import { CommandHandler, } from 'contexts/shared/domain/CommandHandler';

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
    constructor(
        private readonly commandHandlers: Array<CommandHandler<Command>>,
    ) {
        super();

        this.commandHandlers.forEach((commandHandler) => {
            this.set(commandHandler.subscribedTo(), commandHandler);
        });
    }

    public get(command: Command): CommandHandler<Command> {
        const commandHandler = super.get(command.constructor);
        if (!commandHandler) {
            throw new Error('Command handler not found');
        }

        return commandHandler;
    }
}
