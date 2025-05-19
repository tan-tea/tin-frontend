'use client'

import 'reflect-metadata';

import {
    FC,
    ReactNode,
    ReactElement,
} from 'react';
import { Provider, } from 'jotai';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ThemeProvider, } from '@mui/material/styles';

import theme from 'app/theme';
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
                                <Provider>
                                    <DialogProvider>
                                        {children}
                                        <ThemeWatcher/>
                                    </DialogProvider>
                                </Provider>
                            </ApplicationStoreProvider>
                        </QueryClientProvider>
                    </DatabaseProvider>
                </WorkerProvider>
            </ContainerProvider>
        </ThemeProvider>
    );
};
