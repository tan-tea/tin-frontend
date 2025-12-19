'use client';

import type {
    FC,
    ReactNode,
    ReactElement
} from 'react';

import { useState } from 'react';
import { minutesToMilliseconds } from 'date-fns';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';

import { DialogProvider } from 'shared/contexts/dialog';
import { DatabaseProvider } from 'shared/contexts/database';
import { ContainerProvider } from 'shared/contexts/container';
import { ApplicationStoreProvider } from 'shared/stores/application-store';
import { DynamicThemeProvider } from 'shared/contexts/dynamic-theme';

import {
    Item,
    BreadcrumbProvider,
} from 'ui/breadcrumb';

import ThemeLayout from 'layout/Theme';
import ThemeWatcher from 'components/theme-watcher';

type ProvidersProps = {
    children: ReactNode;
};

export default function Providers(
    props: ProvidersProps,
): ReactElement<FC<ProvidersProps>> {
    'use memo'
    const { children } = props;

    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: minutesToMilliseconds(5),
                    refetchOnWindowFocus: true,
                    gcTime: minutesToMilliseconds(1),
                    retry: 3,
                    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
                },
            },
        })
    );

    const breadcrumbs: Array<Item> = [
        {
            label: 'Home',
            href: '/',
        },
    ];

    return (
        <ContainerProvider>
            <DatabaseProvider>
                <ApplicationStoreProvider>
                    <QueryClientProvider client={queryClient}>
                        <DynamicThemeProvider>
                            <ThemeLayout>
                                <DialogProvider>
                                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
                                        <BreadcrumbProvider value={breadcrumbs}>
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
        </ContainerProvider>
    );
}
