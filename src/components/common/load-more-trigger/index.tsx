'use client'

import type { FC } from 'react';

import { useRef, useEffect } from 'react';

type Props = Readonly<{
    onVisible: () => void;
    disabled?: boolean;
    hasMore?: boolean;
}>;

const LoadMoreTrigger: FC<Props> = ({
    onVisible,
    disabled,
    hasMore,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (disabled || !hasMore || !ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onVisible();
                }
            },
            {
                rootMargin: '200px',
            },
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [onVisible, disabled, hasMore]);

    return <div ref={ref} style={{ height: 1 }} />;
}

export default LoadMoreTrigger;
