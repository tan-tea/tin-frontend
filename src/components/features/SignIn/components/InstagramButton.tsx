'use client'

import {
    FC,
    memo,
    MouseEvent,
    useCallback,
    MouseEventHandler,
} from 'react';
import { useTranslations, } from 'next-intl';

import { Button, } from 'ui/index';
import { Instagram, } from 'icons/index';
import { createRandomState, } from 'lib/utils';

import { useContainer, } from 'shared/contexts/container';

import { CommandBus, } from 'contexts/shared/domain/CommandBus';
import { AuthCommand, } from 'contexts/auth/domain/AuthCommand';

type InstagramButtonProps = object;

const InstagramButton: FC<InstagramButtonProps> = (props: InstagramButtonProps) => {
    const {} = props;

    const t = useTranslations();

    const {
        resolveDependency,
    } = useContainer();

    const commandBus = resolveDependency<CommandBus>('CommandBus');

    const handleInstagramAuthentication: MouseEventHandler = useCallback(
        async (event: MouseEvent) => {
            event?.preventDefault?.();
            event?.stopPropagation?.();

            const state = createRandomState();

            sessionStorage.setItem('current_auth', JSON.stringify({
                provider: 'instagram',
                state,
            }));

            const authCommand = new AuthCommand({
                state,
                url: process.env.NEXT_PUBLIC_INSTAGRAM_AUTHORIZE_URL!,
                clientId: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID!,
                redirectURI: process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI!,
                responseType: 'code',
                scope: process.env.NEXT_PUBLIC_INSTAGRAM_SCOPE!,
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
            className='bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-sm py-3'
            startIcon={<Instagram className='absolute left-0 top-1/2 -translate-y-1/2 ml-4 size-6 fill-white'/>}
            onClick={handleInstagramAuthentication}
        >
            {t('signin.instagram')}
        </Button>
    );
};

export default memo(InstagramButton);
