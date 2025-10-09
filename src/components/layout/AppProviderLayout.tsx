'use client'

import 'reflect-metadata';

import type {
    FC,
    ReactNode,
    ReactElement,
} from 'react';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ThemeProvider, } from '@mui/material/styles';
import { APIProvider, } from '@vis.gl/react-google-maps';

import theme from 'app/[locale]/theme';
import ThemeWatcher from 'common/Theme/Watcher';

import { DialogProvider, } from 'shared/contexts/dialog';
import { WorkerProvider, } from 'shared/contexts/worker';
import { DatabaseProvider, } from 'shared/contexts/database';
import { ContainerProvider, } from 'shared/contexts/container';
import { ApplicationStoreProvider, } from 'shared/stores/application-store';

const queryClient = new QueryClient();

type AppProviderLayoutProps = {
    children: ReactNode;
};

export default function AppProviderLayout(
    props: AppProviderLayoutProps
): ReactElement<FC<AppProviderLayoutProps>> {
    const { children, } = props;

    return (
        <ThemeProvider theme={theme}>
            <ContainerProvider>
                <WorkerProvider>
                    <DatabaseProvider>
                        <QueryClientProvider client={queryClient}>
                            <ApplicationStoreProvider>
                                <DialogProvider>
                                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
                                        {children}
                                    </APIProvider>
                                    <ThemeWatcher/>
                                </DialogProvider>
                            </ApplicationStoreProvider>
                        </QueryClientProvider>
                    </DatabaseProvider>
                </WorkerProvider>
            </ContainerProvider>
        </ThemeProvider>
    );
};
