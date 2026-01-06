import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { minutesToMilliseconds } from 'date-fns'
import { useQuery } from '@tanstack/react-query'

import { getAllCustomizationByWorkspace } from 'app/actions'

import { cachedCustomizationAtom } from 'shared/state'

export function useCustomization(workspaceId: string) {
    'use memo'
    return useQuery({
        queryKey: ['customization', workspaceId],
        queryFn: () => getAllCustomizationByWorkspace(workspaceId),
        staleTime: minutesToMilliseconds(60),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        gcTime: Infinity,
        retry: 3,
    });
}

export function useCustomizationData(workspaceId: string) {
    'use memo'
    const setCachedCustomization = useSetAtom(cachedCustomizationAtom)

    const {
        data,
        error,
        isError,
        isSuccess,
        isLoading,
        ...query
    } = useCustomization(workspaceId);

    useEffect(() => {
        if (!data) return;

        setCachedCustomization(data);
    }, [data, setCachedCustomization]);

    return {
        ...query,
        error,
        isError,
        isLoading,
        isSuccess,
        customization: data,
    };
}
