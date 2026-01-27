import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { minutesToMilliseconds } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getVerifiedWorkspaceById } from 'app/actions';

import { cachedWorkspaceAtom } from 'shared/state';

export function useWorkspace(workspaceId: string) {
    return useSuspenseQuery({
        queryKey: ['workspace-by-id', workspaceId],
        queryFn: () => getVerifiedWorkspaceById(workspaceId),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: minutesToMilliseconds(5),
        gcTime: minutesToMilliseconds(10),
        retry: 2,
    });
}

export function useWorkspaceData(workspaceId: string) {
    'use memo'
    const setCachedWorkspace = useSetAtom(cachedWorkspaceAtom);

    const {
        data,
        error,
        isError,
        isSuccess,
        isLoading,
        ...query
    } = useWorkspace(workspaceId);

    useEffect(() => {
        if (!data) return;

        setCachedWorkspace(data);
    }, [data, setCachedWorkspace]);

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
        workspace: data,
    };
}
