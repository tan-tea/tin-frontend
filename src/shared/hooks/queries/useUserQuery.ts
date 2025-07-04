'use client'

import {
    useQuery,
    UseQueryResult,
} from '@tanstack/react-query';

import { useContainer, } from 'shared/contexts/container';

type UseUserQueryResult = UseQueryResult<null, Error>;

const useUserQuery: () => UseUserQueryResult = () => {
    const {
        resolveDependency,
    } = useContainer();

    // const getDiscordUser = resolveDependency(GetDiscordUser);

    // const {
    //     discord: { accessToken, },
    // } = useApplicationStore(
    //     useShallow(store => store),
    // );

    const query = useQuery({
        queryKey: [
            'discordUser',
            // accessToken,
        ],
        queryFn: async ({
            // queryKey: [, token,],
        }) => {
            // const user = await getDiscordUser.execute(token!);

            // return user;
            return null;
        },
        // enabled: !!accessToken,
        staleTime: Infinity,
    }) as UseUserQueryResult;

    return query;
};

export default useUserQuery;
