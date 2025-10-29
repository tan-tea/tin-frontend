'use client'

import { useRef, } from 'react';
import {
    useStore,
    createStore,
} from 'zustand';
import {
    persist,
    createJSONStorage,
} from 'zustand/middleware';

import type {
    ApplicationState,
    ApplicationStore,
} from 'shared/stores/application-store/types';
import { defaultInitState, } from 'shared/stores/application-store/constants';

import contextFactory from 'shared/contexts/contextFactory';

const createApplicationStore = (
    initState: ApplicationState = defaultInitState,
) => {
    return createStore<ApplicationStore>()(
        persist(
            (set, get) => ({
                ...initState,
                setTheme: (theme) => set((state) => ({
                    ...state,
                    theme,
                })),
                setLanguage: (language) => set((state) => ({
                    ...state,
                    language,
                })),
                setGeolocation: (geolocation) => set((state) => ({
                    ...state,
                    geolocation,
                })),
                setLoading: (loading) => set((state) => ({
                    ...state,
                    loading,
                })),
                setShowHeader: (show: boolean) => set((state) => ({
                    ...state,
                    showHeader: show,
                })),
                setShowBottomNavigation: (show: boolean) => set((state) => ({
                    ...state,
                    showBottomNavigation: show,
                })),
            }),
            {
                name: 'application-storage',
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => Object.fromEntries(
                    Object
                        .entries(state)
                        .filter(([key]) => ![
                            'loading',
                            'showHeader',
                            'showBottomNavigation',
                        ].includes(key)),
                ),
            },
        ),
    );
};

type ApplicationStoreApi = ReturnType<typeof createApplicationStore>;

const useApplicationStoreContextState: () => ApplicationStoreApi = () => {
    const storeRef = useRef<ApplicationStoreApi | null>(null);
    if (!storeRef.current) {
        storeRef.current = createApplicationStore();
    }

    return storeRef.current;
};

const {
    Provider: ApplicationStoreProvider,
    useContext: useApplicationStoreContext,
} = contextFactory(useApplicationStoreContextState);

const useApplicationStore = <T>(
    selector: (store: ApplicationStore) => T,
): T => {
    const applicationStoreContext = useApplicationStoreContext();
    if (!applicationStoreContext) {
        throw new Error('useApplicationStore must be used within an ApplicationStoreProvider');
    }

    return useStore(applicationStoreContext, selector);
}

export {
    type ApplicationStoreApi,
    useApplicationStore,
    useApplicationStoreContext,
    ApplicationStoreProvider,
};
