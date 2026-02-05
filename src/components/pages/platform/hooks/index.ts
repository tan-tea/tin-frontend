import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import {
    secondsToMilliseconds,
    minutesToMilliseconds,
} from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getVerifiedShopsByWorkspace } from 'app/actions';

import { cachedShopsAtom } from 'shared/state';

export function useShopsByWorkspace(workspaceId: string) {
    'use memo'
    return useSuspenseQuery({
        queryKey: ['shops-by-workspace', workspaceId],
        queryFn: () => getVerifiedShopsByWorkspace(workspaceId),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: secondsToMilliseconds(30),
        gcTime: minutesToMilliseconds(5),
        retry: 2,
    });
}

export function useShopsByWorkspaceData(workspaceId: string) {
    'use memo'
    const setCachedShops = useSetAtom(cachedShopsAtom);

    const {
        data = [],
        error,
        isError,
        isSuccess,
        isLoading,
        ...query
    } = useShopsByWorkspace(workspaceId);

    useEffect(() => {
        if (!data) return;

        setCachedShops(data);
    }, [data, setCachedShops]);

    useEffect(() => {
        if (isError && !isLoading) {
            toast.error(error.message);
        }
    }, [isError, isLoading, error]);

    const primaryShop = data.find(s => s.isPrimary) ?? null;

    const availableShops = (data ?? []).filter(s => s.address && s.geolocation);

    const hasMultipleShops = data.length > 1;

    return {
        ...query,
        error,
        isError,
        isLoading,
        isSuccess,
        shops: data,
        primaryShop,
        availableShops,
        hasMultipleShops,
    };
}
