import type { ReactNode } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import { getQueryClient } from 'app/get-query-client';
import { getWorkspaceDetailsById, } from 'app/actions';

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

    const queryClient = getQueryClient();

    queryClient.prefetchQuery({
        queryKey: ['workspace', workspaceId],
        queryFn: () => getWorkspaceDetailsById(workspaceId)
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
