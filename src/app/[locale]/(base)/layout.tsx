import type {
    FC,
    ReactNode,
    ReactElement,
} from 'react';

import { clientEnv } from 'env/client';
import { getWorkspaceDetailsById, } from 'app/actions';

import BaseLayout from 'layout/Base';

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

    const workspace = await getWorkspaceDetailsById(clientEnv.NEXT_PUBLIC_WORKSPACE_ID);

    return (
        <BaseLayout initialWorkspace={workspace}>
            {children}
        </BaseLayout>
    );
};
