import {
    useState,
    useEffect,
    useCallback,
} from 'react';

type Scroll = {
    y: number;
    x: number;
};

type UseScroll = {
    moving: boolean;
    scroll: Scroll;
    lastScrollY: number;
};

type UseScrollHandler = () => UseScroll;

export const useScroll: UseScrollHandler = () => {
    const [scroll, setScroll] = useState<Scroll>({
        x: 0,
        y: 0,
    });
    const [moving, setMoving,] = useState<boolean>(false);
    const [lastScrollY, setLastScrollY] = useState<number>(0);

    const handleScroll: (event: Event) => void = useCallback(
        () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 35) setMoving(true);
            else setMoving(false);

            setScroll({
                x: window.scrollX,
                y: window.scrollY,
            });
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
        scroll,
        lastScrollY,
    };
};
