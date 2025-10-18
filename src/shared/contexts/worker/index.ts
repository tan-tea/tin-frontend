'use client'

import contextFactory from 'shared/contexts/contextFactory';
import useWorkerContextState from 'shared/contexts/worker/useWorkerContextState';

const {
    Provider,
    useContext,
} = contextFactory(useWorkerContextState);

export {
    Provider as WorkerProvider,
    useContext as useWorker,
};
