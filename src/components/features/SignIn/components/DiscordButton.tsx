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

import { RedirectToDiscord, } from 'contexts/auth/application/RedirectToDiscord';

type DiscordButtonProps = object;

const DiscordButton: FC<DiscordButtonProps> = (props: DiscordButtonProps) => {
    const {} = props;

    const t = useTranslations();

    const {
        resolveDependency,
    } = useContainer();

    const redirectToDiscordUseCase = resolveDependency(RedirectToDiscord);

    const handleDiscordAuthentication: MouseEventHandler = useCallback(
        (event: MouseEvent) => {
            event?.preventDefault?.();
            event?.stopPropagation?.();

            if (redirectToDiscordUseCase)
                redirectToDiscordUseCase?.execute?.();
        },
        [],
    );

    return (
        <Button
            block
            size='large'
            variant='contained'
            className='bg-discord'
            startIcon={<Discord className='size-6'/>}
            onClick={handleDiscordAuthentication}
        >
            {t('signin.discord')}
        </Button>
    );
};

export default memo(DiscordButton);
