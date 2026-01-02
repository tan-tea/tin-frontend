import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { useNavigation } from 'shared/hooks';
import { ApplicationLanguage, ApplicationStore } from 'shared/stores/application-store/types';
import { useApplicationStore, useApplicationStoreContext } from 'shared/stores/application-store';

type UseSyncLanguageWithRouterHandler = () => void;

export const useSyncLanguageWithRouter: UseSyncLanguageWithRouterHandler = () => {
    'use memo'
    const store = useApplicationStoreContext();

    const { locale } = useParams<{ locale: ApplicationLanguage }>();

    const {
        language,
        setLanguage,
        setLoading,
    } = useApplicationStore(
        useShallow(store => store)
    );

    const {
        changeLanguage,
        isChangingLanguage,
    } = useNavigation();

    useEffect(() => {
        if (locale !== language) {
            setLanguage(locale);
        }
    }, []);

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
};
