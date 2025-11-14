'use client'

import {
    useEffect,
    useCallback,
    type FC,
    type ReactElement,
} from 'react';
import { useTranslations, } from 'next-intl';

import { useNavigation, } from 'shared/hooks';
import { useContainer, } from 'shared/contexts/container';

import { CommandBus, } from 'contexts/shared/domain/CommandBus';
import { ExchangeCodeCommand, } from 'contexts/auth/domain/ExchangeCodeCommand';

import DeviceDetectorLayout from 'common/DeviceDetector';

import CallbackMobile from './mobile';
import CallbackDesktop from './desktop';

type Provider = {
    [K in string]: (sessionState: string) => void;
};

type OwnCallbackProps = object;

export type CallbackProps = {
    t: ReturnType<typeof useTranslations>;
    navigation: ReturnType<typeof useNavigation>;
};

export default function Callback(
    props: OwnCallbackProps,
): ReactElement<FC<OwnCallbackProps>> {
    const {} = props;

    const t = useTranslations();
    const navigation = useNavigation();

    const {
        resolveDependency,
    } = useContainer();

    const commandBus = resolveDependency<CommandBus>('CommandBus');

    const handleInstagramLogin: (state: string) => Promise<void> = useCallback(
        async (sessionState: string) => {
            const searchParams = new URLSearchParams(window.location.search);

            const code = searchParams.get('code');
            const state = searchParams.get('state');

            window.history.replaceState(null, '', window.location.pathname);

            if (!state || state !== sessionState) {
                throw new Error('Invalid state value');
            }

            if (!code) {
                throw new Error('No code from provider');
            }

            const exchangeCodeCommand = new ExchangeCodeCommand({
                url: process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN_URL!,
                clientId: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID!,
                clientSecret: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_SECRET!,
                grantType: 'authorization_code',
                redirectURI: process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI!,
                code: code || '',
            });

            const accessToken = await commandBus.dispatch<string>(exchangeCodeCommand);
            console.log('Access Token:', accessToken);
        },
        [],
    );

    const handleDiscordLogin: (state: string) => Promise<void> = useCallback(
        async () => {

        },
        [],
    );

    useEffect(() => {
        const handle = async () => {
            const providers: Provider = {
                'discord': handleDiscordLogin,
                'instagram': handleInstagramLogin,
            };

            const currentAuthSession = sessionStorage.getItem('current_auth');
            if (!currentAuthSession) {
                throw new Error('No current auth session');
            }

            const {
                state,
                provider,
            } = JSON.parse(currentAuthSession);

            if (providers?.[provider]) {
                await providers?.[provider]?.(state);
            }

            navigation.navigate('/');
        };

        handle()
            .catch((error) => console.error(error));

    }, [handleDiscordLogin, handleInstagramLogin,]);

    const childProps: CallbackProps = {
        t,
        navigation,
    };

    return (
        <DeviceDetectorLayout
            MobileComponent={<CallbackMobile {...childProps}/>}
            DesktopComponent={<CallbackDesktop {...childProps}/>}
        />
    );
};
