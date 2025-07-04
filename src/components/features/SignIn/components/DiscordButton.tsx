'use client'

import {
    FC,
    memo,
    useCallback,
    MouseEvent,
    MouseEventHandler,
} from 'react';
import { useTranslations, } from 'next-intl';

import { Button, } from 'ui/index';
import { Discord, } from 'icons/index';

import { useContainer, } from 'shared/contexts/container';

import { CommandBus, } from 'contexts/shared/domain/CommandBus';
import { AuthCommand, } from 'contexts/auth/domain/AuthCommand';

type DiscordButtonProps = object;

const DiscordButton: FC<DiscordButtonProps> = (props: DiscordButtonProps) => {
    const {} = props;

    const t = useTranslations();

    const {
        resolveDependency,
    } = useContainer();

    const commandBus = resolveDependency<CommandBus>('CommandBus');

    const handleDiscordAuthentication: MouseEventHandler = useCallback(
        async (event: MouseEvent) => {
            event?.preventDefault?.();
            event?.stopPropagation?.();

            const authCommand = new AuthCommand({
                state: '',
                url: process.env.NEXT_PUBLIC_DISCORD_AUTHORIZE_URL!,
                clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
                redirectURI: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!,
                responseType: 'code',
                scope: process.env.NEXT_PUBLIC_DISCORD_SCOPE!,
            });

            await commandBus.dispatch<Promise<void>>(authCommand);
        },
        [],
    );

    return (
        <Button
            block
            size='large'
            rounded='full'
            variant='contained'
            className='bg-discord text-sm py-3'
            startIcon={<Discord className='absolute left-0 top-1/2 -translate-y-1/2 ml-4 size-6'/>}
            onClick={handleDiscordAuthentication}
        >
            {t('signin.discord')}
        </Button>
    );
};

export default memo(DiscordButton);
