import {
    useEffect,
} from 'react';
import { useShallow } from 'zustand/shallow';

import { useNavigation } from 'shared/hooks';
import { ApplicationStore } from 'shared/stores/application-store/types';
import { useApplicationStore, useApplicationStoreContext } from 'shared/stores/application-store';

type UseSyncLanguageWithRouter = {
    loading: boolean;
};

type UseSyncLanguageWithRouterHandler = () => UseSyncLanguageWithRouter;

export const useSyncLanguageWithRouter: UseSyncLanguageWithRouterHandler = () => {
    'use memo'
    const store = useApplicationStoreContext();

    const {
        language,
        setLoading,
    } = useApplicationStore(
        useShallow(store => store)
    );

    const {
        changeLanguage,
        isChangingLanguage,
    } = useNavigation();

    useEffect(() => {
        if (!store) return;

        const handleChangeLanguage = (
            state: ApplicationStore,
            prevState: ApplicationStore
        ) => {
            if (state?.language === prevState?.language) return;

            changeLanguage(state?.language);
        };

        const unsubscribe = store.subscribe(handleChangeLanguage);
        return unsubscribe;
    }, [store, changeLanguage, language,]);

    useEffect(() => {
        setLoading(isChangingLanguage);
    }, [isChangingLanguage,]);

    return {
        loading: isChangingLanguage,
    };
};
