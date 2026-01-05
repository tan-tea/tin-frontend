import { toast } from 'sonner'
import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { minutesToMilliseconds } from 'date-fns'
import { useQuery } from '@tanstack/react-query'

import { getAllCustomizationByWorkspace } from 'app/actions'

import { cachedCustomizationAtom } from 'shared/state'

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
    } = useQuery({
        queryKey: ['customization', workspaceId],
        queryFn: () => getAllCustomizationByWorkspace(workspaceId),
        staleTime: minutesToMilliseconds(60),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        gcTime: Infinity,
        retry: 3,
    });

    useEffect(() => {
        if (!data) return;

        setCachedCustomization(data);
    }, [data, setCachedCustomization]);

    useEffect(() => {
        if (isError && !isLoading) {
            toast.error(error.message);
        }
    }, [isError, isLoading, error]);

    return {
        ...query,
        error,
        isError,
        isLoading,
        isSuccess,
        customization: data,
    };
}
