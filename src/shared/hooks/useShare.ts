import {
    useState,
    useEffect,
} from 'react';

type UseShare = {
    isSupported: boolean;
    share: (data: ShareData) => Promise<void>;
};

type UseShareHandler = () => UseShare;

export const useShare: UseShareHandler = () => {
    'use memo'
    const [isSupported, setIsSupported] = useState<boolean>(true);

    useEffect(() => {
        if (typeof navigator === 'undefined' || !navigator.share) {
            setIsSupported(false);
        }
    }, []);

    const share: UseShare['share'] = async (data) => {
        try {
            if (!isSupported) return;

            await navigator.share({
                url: window.location.href,
                ...data,
            });
        } catch {
            console.warn('Something went wrong in share');
        }
    }

    return {
        isSupported,
        share,
    };
}
