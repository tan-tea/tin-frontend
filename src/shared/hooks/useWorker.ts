import {
    useRef,
    useEffect,
    type RefObject
} from 'react';

type UseWorker = RefObject<Worker | undefined>;

type UseWorkerProps<T> = {
    workerInit?: () => Worker;
    onMessage?: (message: MessageEvent<T>) => void;
};

type UseWorkerHandler = <T>(props: UseWorkerProps<T>) => UseWorker;

export const useWorker: UseWorkerHandler = <T>(props: UseWorkerProps<T>) => {
    const {
        workerInit,
        onMessage,
    } = props;

    const worker = useRef<Worker | undefined>(undefined);

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
            worker.current = undefined;
        };
    }, [onMessage, workerInit]);

    return worker;
};
