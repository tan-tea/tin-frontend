import {
    useState,
    useEffect,
    useCallback,
} from 'react';

type WindowSize = {
    width: number;
    height: number;
};

type UseWindowSize = WindowSize & {
    sizeChanged: boolean;
};

type UseWindowSizeHandler = () => UseWindowSize;

export const useWindowSize: UseWindowSizeHandler = () => {
    const [sizeChanged, setSizeChanged] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    });

    const handleResize = useCallback(
        () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const sizeChanged = width !== windowSize.width || height !== windowSize.height;

            setSizeChanged(sizeChanged);

            setWindowSize({
                width,
                height,
            });
        },
        [],
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize,]);

    return {
        ...windowSize,
        sizeChanged,
    };
}
