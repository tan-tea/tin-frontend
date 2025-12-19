import {
    useState,
    useEffect,
    useCallback,
} from 'react';

import { useWindowSize } from './useWindowSize';

export const useComputedStyle = <T extends HTMLElement>(element: T | null) => {
    const [style, setStyle] = useState<CSSStyleDeclaration | null>(null);

    const { sizeChanged,} = useWindowSize();

    const getComputedStyle = useCallback(
        (element: T) => {
            const result = window.getComputedStyle(element);
            return result;
        },
        [],
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!element) return;

        const computed = window.getComputedStyle(element);
        setStyle(computed);
    }, [element, sizeChanged,]);

    return style;
}
