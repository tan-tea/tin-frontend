import {
    useState,
    useEffect,
    useCallback,
} from 'react';

function getStoredValue<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;

    try {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;

        if (item === 'undefined') return defaultValue;

        return JSON.parse(item);
    } catch {
        return defaultValue;
    }
}

export function useLocalStorage<T>(
    key: string,
    defaultValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
    'use memo'
    const [storedValue, setStoredValue] = useState<T>(() => getStoredValue(key, defaultValue));

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    const newValue = JSON.parse(e.newValue);
                    setStoredValue(newValue);
                } catch {
                    setStoredValue(e.newValue as unknown as T);
                }
            }
        };

        const handleCustomStorageChange = (e: CustomEvent) => {
            if (e.detail.key === key) {
                setStoredValue(e.detail.value);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('localStorage-change', handleCustomStorageChange as EventListener);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener(
                'localStorage-change',
                handleCustomStorageChange as EventListener,
            );
        };
    }, [key]);

    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                const nextValue = value instanceof Function ? value(storedValue) : value;

                setStoredValue(nextValue);

                if (typeof window !== 'undefined') {
                    if (nextValue === undefined) {
                        localStorage.removeItem(key);
                    } else {
                        localStorage.setItem(key, JSON.stringify(nextValue));
                    }

                    const customEvent = new CustomEvent('localStorage-change', {
                        detail: { key, value: nextValue },
                    });

                    window.dispatchEvent(customEvent);
                }
            } catch (error) {
                console.warn(`Error saving to localStorage key "${key}":`, error);
            }
        },
        [key, storedValue],
    );

    return [storedValue, setValue];
}
