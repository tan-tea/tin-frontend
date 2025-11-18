import {
    useState,
    useEffect,
    RefObject,
} from 'react';

import { useWindowSize } from './useWindowSize';

export const useComputedStyle = <T extends HTMLElement>(
    ref: RefObject<T | null>
) => {
    const [style, setStyle] = useState<CSSStyleDeclaration | null>(null);

    const { sizeChanged,} = useWindowSize();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!ref?.current) return;

        const computed = window.getComputedStyle(ref.current);
        setStyle(computed);
    }, [ref, sizeChanged,]);

    return style;
}
