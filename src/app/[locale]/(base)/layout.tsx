import type {
    FC,
    ReactNode,
    ReactElement,
} from 'react';

import { clientEnv } from 'env/client';
import { getWorkspaceWithShopsAndCategories } from 'app/actions';

import BaseLayout from 'layout/BaseLayout';

type LayoutProps = {
    params: Promise<{
        locale: string;
    }>;
    children: ReactNode;
};

export default async function Layout(
    props: LayoutProps
): Promise<ReactElement<FC<LayoutProps>>> {
    const {
        params,
        children,
    } = props;

    const { locale } = await params;

    const workspace = await getWorkspaceWithShopsAndCategories(
        clientEnv.NEXT_PUBLIC_WORKSPACE_ID,
        locale
    );

    return (
        <BaseLayout initialWorkspace={workspace}>
            {children}
        </BaseLayout>
    );
};
