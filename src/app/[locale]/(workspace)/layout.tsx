import type { ReactNode } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import { getVerifiedWorkspaceById } from 'app/actions';
import { cachedQueryClient } from 'app/get-query-client';

import WorkspaceLayout from 'layouts/workspace';
import LocationDialog from 'dialogs/location-dialog';

type LayoutProps = Readonly<{
    params: Promise<{ locale: string }>;
    modal: ReactNode;
    children: ReactNode;
}>;

export default async function Layout(props: LayoutProps) {
    const { modal, children } = props;

    const workspaceId = clientEnv.NEXT_PUBLIC_WORKSPACE_ID;

    const queryClient = cachedQueryClient();

    queryClient.prefetchQuery({
        queryKey: ['workspace-by-id', workspaceId],
        queryFn: () => getVerifiedWorkspaceById(workspaceId)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <WorkspaceLayout workspaceId={workspaceId}>
                {children}
                {modal}
                <LocationDialog/>
            </WorkspaceLayout>
        </HydrationBoundary>
    );
};
