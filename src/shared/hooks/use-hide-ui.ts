import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { useApplicationStore } from 'shared/stores/application-store';

type Props = {
    hideHeader?: boolean;
    hideBottomNavigation?: boolean;
};

export function useHideUI(props: Props): void {
    const {
        hideHeader = true,
        hideBottomNavigation = true,
    } = props;

    const {
        setShowHeader,
        setShowBottomNavigation,
    } = useApplicationStore(
        useShallow(store => store),
    );

    useEffect(() => {
        if (hideHeader) setShowHeader(false);
        if (hideBottomNavigation) setShowBottomNavigation(false);

        return () => {
            if (hideHeader) setShowHeader(true);
            if (hideBottomNavigation) setShowBottomNavigation(true);
        };
    }, [hideHeader, hideBottomNavigation]);
}
