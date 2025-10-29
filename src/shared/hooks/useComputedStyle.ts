import {
    useRef,
    useMemo,
    useEffect,
} from 'react';

import { useWindowSize } from './useWindowSize';

type UseComputedStyle = CSSStyleDeclaration | null;

type UseComputedStyleProps = Element | undefined;

type UseComputedStyleHandler = (target: UseComputedStyleProps) => UseComputedStyle;

export const useComputedStyle: UseComputedStyleHandler = (target) => {
    const targetRef = useRef(target);

    const {
        sizeChanged,
    } = useWindowSize();

    const computedStyle = useMemo<CSSStyleDeclaration | null>(
        () => {
            if (typeof window === 'undefined') return null;

            const element = targetRef.current;
            if (!element) return null;

            return window.getComputedStyle(element);
        },
        [targetRef.current,],
    );

    useEffect(() => {
        if (!targetRef.current) targetRef.current = target;

        return () => {
            if (targetRef.current) targetRef.current = undefined;
        }
    }, [target, sizeChanged,]);

    return computedStyle;
}
