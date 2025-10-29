'use client';

import type { FC, ReactNode, ReactElement } from 'react';
import { minutesToMilliseconds } from 'date-fns';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { APIProvider } from '@vis.gl/react-google-maps';

import { DialogProvider } from 'shared/contexts/dialog';
import { DatabaseProvider } from 'shared/contexts/database';
import { ContainerProvider } from 'shared/contexts/container';
import { ApplicationStoreProvider } from 'shared/stores/application-store';
import { DynamicThemeProvider } from 'shared/contexts/dynamic-theme';

import ThemeWatcher from 'common/Theme/Watcher';
import ThemeProviderLayout from 'layout/ThemeProviderLayout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: minutesToMilliseconds(5),
            refetchOnWindowFocus: true,
            gcTime: minutesToMilliseconds(1),
            retry: 3,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        },
    },
});

type AppProviderLayoutProps = {
    children: ReactNode;
};

export default function AppProviderLayout(
    props: AppProviderLayoutProps,
): ReactElement<FC<AppProviderLayoutProps>> {
    const { children } = props;

    return (
        <ContainerProvider>
            <DatabaseProvider>
                <ApplicationStoreProvider>
                    <QueryClientProvider client={queryClient}>
                        <DynamicThemeProvider>
                            <ThemeProviderLayout>
                                <DialogProvider>
                                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
                                        {children}
                                    </APIProvider>
                                    <ThemeWatcher />
                                </DialogProvider>
                            </ThemeProviderLayout>
                        </DynamicThemeProvider>
                    </QueryClientProvider>
                </ApplicationStoreProvider>
            </DatabaseProvider>
        </ContainerProvider>
    );
}
