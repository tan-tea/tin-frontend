import {
    useState,
    useEffect,
    useCallback,
} from 'react';

type UseScroll = {
    moving: boolean;
    lastScrollY: number;
};

type UseScrollHandler = () => UseScroll;

export const useScroll: UseScrollHandler = () => {
    const [moving, setMoving,] = useState<boolean>(false);
    const [lastScrollY, setLastScrollY] = useState<number>(0);

    const handleScroll: (event: Event) => void = useCallback(
        (event) => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) setMoving(true);
            else setMoving(false);

            setLastScrollY(currentScrollY);
        },
        [lastScrollY,],
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll,]);

    return {
        moving,
        lastScrollY,
    };
};
