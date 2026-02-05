import type { RefObject } from 'react';

import {
    useRef,
    useEffect,
} from 'react';

type UseWorker = RefObject<Worker | null>;

type UseWorkerProps<T> = {
    workerInit?: () => Worker;
    onMessage?: (message: MessageEvent<T>) => void;
};

type UseWorkerHandler = <T>(props: UseWorkerProps<T>) => UseWorker;

export const useWorker: UseWorkerHandler = (props) => {
    const {
        workerInit,
        onMessage,
    } = props;

    const worker = useRef<Worker | null>(null);

    useEffect(() => {
        if (workerInit && !worker.current) {
            worker.current = workerInit();

            if (onMessage) {
                worker.current.addEventListener('message', onMessage, {
                    passive: true,
                });
            }

            worker.current.postMessage('init');
        }

        return () => {
            worker.current?.terminate();
            worker.current = null;
        };
    }, [onMessage, workerInit]);

    return worker;
};
