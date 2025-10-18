import type {
    FC,
    ReactNode,
    ReactElement,
} from 'react';

import { createClient, } from 'lib/supabase/server';

import BaseLayout from 'layout/BaseLayout';

type LayoutProps = {
    children: ReactNode;
};

export default async function Layout(
    props: LayoutProps
): Promise<ReactElement<FC<LayoutProps>>> {
    const {
        children,
    } = props;

    const supabase = await createClient();

    const {
        data: workspace,
    } = await supabase.from('workspaces').select(`
            *,
            shops ( * ),
            categories ( * )
        `)
        .eq('id', process.env.NEXT_PUBLIC_WORKSPACE_ID!)
        .single();

    return (
        <BaseLayout initialWorkspace={workspace}>
            {children}
        </BaseLayout>
    );
};
