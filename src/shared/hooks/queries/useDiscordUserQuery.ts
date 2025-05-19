'use client'

import {
    useQuery,
    UseQueryResult,
} from '@tanstack/react-query';
import { useShallow, } from 'zustand/react/shallow';

import {
    DiscordUser,
} from 'contexts/shared/domain/models';
import { GetDiscordUser, } from 'contexts/user/application/GetDiscordUser';

import { useContainer, } from 'shared/contexts/container';
import { useApplicationStore, } from 'shared/stores/application-store';

type UseDiscordUserQueryResult = UseQueryResult<DiscordUser, Error>;

const useDiscordUserQuery: () => UseDiscordUserQueryResult = () => {
    const {
        resolveDependency,
    } = useContainer();

    const getDiscordUser = resolveDependency(GetDiscordUser);

    const {
        discord: { accessToken, },
    } = useApplicationStore(
        useShallow(store => store),
    );

    const query = useQuery({
        queryKey: [
            'discordUser',
            accessToken,
        ],
        queryFn: async ({
            queryKey: [, token,],
        }) => {
            const user = await getDiscordUser.execute(token!);

            return user;
        },
        enabled: !!accessToken,
        staleTime: Infinity,
    }) as UseDiscordUserQueryResult;

    return query;
};

export default useDiscordUserQuery;
