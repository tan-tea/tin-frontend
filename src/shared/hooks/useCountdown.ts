'use client'

import {
    useState,
    useEffect,
} from 'react';
import { getYear } from 'date-fns';

type UseCountdown = string | null;

type UseCountdownProps = {
    date: string | number | Date;
    intervalInMs?: number;
}

type UseCountdownHandler = (props: UseCountdownProps) => UseCountdown;

export const useCountdown: UseCountdownHandler = ({
    date,
    intervalInMs = 1000,
}) => {
    'use memo'
    const [timeLeft, setTimeLeft] = useState<string | null>(null);

    useEffect(() => {
        const endDate = (typeof date === 'number' || typeof date === 'string')
            ? new Date(date)
            : date;

        const isInfinityDate = getYear(endDate) === 9999;
        if (isInfinityDate) return;

        const tick = () => {
            const now = Date.now();

            const diff = Math.max(0, endDate.getTime() - now);

            const totalSeconds = Math.floor(diff / 1000);
            const seconds = totalSeconds % 60;

            const totalMinutes = Math.floor(totalSeconds / 60);
            const minutes = totalMinutes % 60;

            const totalHours = Math.floor(totalMinutes / 60);
            const hours = totalHours % 24;

            const totalDays = Math.floor(totalHours / 24);

            const dd = String(totalDays).padStart(2, '0');
            const hh = String(hours).padStart(2, '0');
            const mm = String(minutes).padStart(2, '0');
            const ss = String(seconds).padStart(2, '0');

            setTimeLeft(`${dd}:${hh}:${mm}:${ss}`);
        };

        tick();

        const interval = window.setInterval(tick, intervalInMs);

        return () => window.clearInterval(interval);
    }, []);

    return timeLeft;
}
