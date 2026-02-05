'use client';

import type { ReactNode } from 'react';

import { APIProvider } from '@vis.gl/react-google-maps';
import { QueryClientProvider } from '@tanstack/react-query';

import { clientEnv } from 'env/client';
import { getQueryClient } from 'app/get-query-client';

import { DialogProvider } from 'shared/contexts/dialog';
import { DatabaseProvider } from 'shared/contexts/database';
import { BreadcrumbProvider } from 'shared/contexts/breadcrumb';
import { DynamicThemeProvider } from 'shared/contexts/dynamic-theme';
import { ApplicationStoreProvider } from 'shared/stores/application-store';

import ThemeLayout from 'layouts/theme';
import ThemeWatcher from 'components/theme-watcher';

type Props = Readonly<{
    children: ReactNode;
}>;

export default function Providers(props: Props) {
    'use memo'
    const { children } = props;

    const queryClient = getQueryClient();

    return (
        <DatabaseProvider>
            <ApplicationStoreProvider>
                <QueryClientProvider client={queryClient}>
                    <DynamicThemeProvider>
                        <ThemeLayout>
                            <DialogProvider>
                                <APIProvider apiKey={clientEnv.NEXT_PUBLIC_GOOGLE_API_KEY}>
                                    <BreadcrumbProvider>
                                        {children}
                                    </BreadcrumbProvider>
                                </APIProvider>
                                <ThemeWatcher/>
                            </DialogProvider>
                        </ThemeLayout>
                    </DynamicThemeProvider>
                </QueryClientProvider>
            </ApplicationStoreProvider>
        </DatabaseProvider>
    );
}
