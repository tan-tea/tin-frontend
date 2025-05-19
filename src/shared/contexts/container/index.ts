import contextFactory from 'shared/contexts/contextFactory';
import useContainerContextState from 'shared/contexts/container/useContainerContextState';

const {
    Provider,
    useContext,
} = contextFactory(useContainerContextState);

export {
    Provider as ContainerProvider,
    useContext as useContainer,
};
