import type { ReactNode } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import { getQueryClient } from 'app/get-query-client';

import AuthLayout from 'layouts/auth';

type LayoutProps = Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}>;

export default async function Layout(props: LayoutProps) {
    const { children } = props;

    const workspaceId = clientEnv.NEXT_PUBLIC_WORKSPACE_ID;

    const queryClient = getQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AuthLayout workspaceId={workspaceId}>
                {children}
            </AuthLayout>
        </HydrationBoundary>
    );
};
