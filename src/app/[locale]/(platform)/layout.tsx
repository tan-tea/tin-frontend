import type { ReactNode } from 'react';

import { clientEnv } from 'env/client';
import { fetchWithBackoff } from 'lib/utils';
import { getWorkspaceDetailsById, } from 'app/actions';

import BaseLayout from 'layout/Base';

type LayoutProps = {
    params: Promise<{ locale: string }>;
    children: ReactNode;
};

export default async function Layout(props: LayoutProps) {
    const { children } = props;

    let workspace: Awaited<ReturnType<typeof getWorkspaceDetailsById>> | null = null;
    try {
        workspace = await fetchWithBackoff<
            ReturnType<typeof getWorkspaceDetailsById>,
            typeof getWorkspaceDetailsById,
            Parameters<typeof getWorkspaceDetailsById>
        >(getWorkspaceDetailsById, [clientEnv.NEXT_PUBLIC_WORKSPACE_ID]) ?? null;
    } catch (error) {
        workspace = null;
        console.error(error);
    }

    return (
        <BaseLayout initialWorkspace={workspace}>
            {children}
        </BaseLayout>
    );
};
