'use client'

import {
    FC,
    ReactElement,
    useEffect,
} from 'react';
import { useShallow, } from 'zustand/react/shallow';

import { useNavigation, } from 'shared/hooks';
import { useApplicationStore, } from 'shared/stores/application-store';

type CallbackProps = object;

export default function Callback(
    props: CallbackProps
): ReactElement<FC<CallbackProps>> {
    const {} = props;

    const {
        navigate,
    } = useNavigation();

    const { setDiscordPayload, } = useApplicationStore(
        useShallow(store => store),
    );

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const expiresIn = params.get('expires_in');
        const accessToken = params.get('access_token');

        window.history.replaceState(null, '', window.location.pathname);

        if (accessToken) {
            setDiscordPayload(accessToken, +(expiresIn || 0));
            navigate('/');

            return;
        }

        navigate('/asd');
    }, []);

    return (
        <div>
            <h1>Callback</h1>
        </div>
    );
};
