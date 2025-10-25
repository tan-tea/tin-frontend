import {
    useEffect,
    useCallback,
} from 'react';

import { useNavigation } from 'shared/hooks';
import { ApplicationStore } from 'shared/stores/application-store/types';
import { useApplicationStoreContext } from 'shared/stores/application-store';

type UseSyncLanguageWithRouter = {
    loading: boolean;
};

type UseSyncLanguageWithRouterHandler = () => UseSyncLanguageWithRouter;

export const useSyncLanguageWithRouter: UseSyncLanguageWithRouterHandler = () => {
    const store = useApplicationStoreContext();

    const {
        changeLanguage,
        isChangingLanguage,
    } = useNavigation();

    const handleChangeLanguage = useCallback(
        (state: ApplicationStore, prevState: ApplicationStore) => {
            if (state?.language === prevState?.language) return;

            changeLanguage(state?.language);
        },
        [changeLanguage,],
    );

    useEffect(() => {
        if (!store) return;

        const unsubscribe = store.subscribe(handleChangeLanguage);
        return unsubscribe;
    }, [store, handleChangeLanguage,]);

    return {
        loading: isChangingLanguage,
    };
};
