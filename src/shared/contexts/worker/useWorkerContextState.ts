'use client'

import {
    useRef,
    useMemo,
    useEffect,
    useCallback,
} from 'react';

type WorkerNames = 'background';

type WorkerRegistry = {
    [K in WorkerNames]: Worker;
};

type WorkerContextState = {
    getWorker: (
        name: WorkerNames,
        onMessage: <T>(message: MessageEvent<T>) => void,
    ) => Worker | null,
};

const useWorkerContextState: () => WorkerContextState = () => {
    const registeredWorkersRef = useRef<WorkerRegistry | null>(null);

    const workerNames = useMemo<Array<WorkerNames>>(() => ['background',], []);

    // const getWorkerURL = useCallback(
    //     (name: WorkerNames) => new URL(
    //         `workers/${name}.ts`,
    //         import.meta.url,
    //     ),
    //     [],
    // );

    const getWorker = useCallback(
        (
            name: WorkerNames,
            onMessage: <T>(message: MessageEvent<T>) => void,
        ) => {
            const worker = registeredWorkersRef?.current?.[name];
            if (!worker) return null;

            worker?.postMessage?.({ type: 'init', });
            worker?.removeEventListener?.('message', onMessage);
            worker?.addEventListener?.('message', onMessage);

            return worker;
        },
        [],
    ) as WorkerContextState['getWorker'];

    // useEffect(() => {
    //     workerNames?.forEach((worker, index) => {
    //         if (index + 1 > (navigator.hardwareConcurrency / 2)) return;

    //         if (!registeredWorkersRef?.current?.[worker]) {
    //             (registeredWorkersRef.current as WorkerRegistry)[worker] = new Worker(
    //                 getWorkerURL(worker),
    //                 {
    //                     type: 'module',
    //                 },
    //             );
    //         }
    //     })

    //     return () => {
    //         if (
    //             registeredWorkersRef?.current
    //             && Object?.keys?.(registeredWorkersRef?.current)?.length
    //         ) {
    //             Object?.values?.(registeredWorkersRef?.current)
    //                 ?.forEach(worker => worker?.terminate());

    //             registeredWorkersRef.current = null;
    //         }
    //     }
    // }, [workerNames]);

    return {
        getWorker,
    };
};

export default useWorkerContextState;
