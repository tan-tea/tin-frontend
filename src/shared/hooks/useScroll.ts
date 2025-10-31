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

    const handleScroll: (event?: Event) => void = useCallback(
        (event) => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) setMoving(true);
            else setMoving(false);

            setScroll({
                x: window.scrollX,
                y: window.scrollY,
            });
            setLastScrollY(currentScrollY);
        },
        [],
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        handleScroll();

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
