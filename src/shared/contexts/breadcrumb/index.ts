import contextFactory from 'shared/contexts/contextFactory';
import contextState from 'shared/contexts/breadcrumb/use-breadcrumb';

const {
    Provider: BreadcrumbProvider,
    useContext: useBreadcrumb,
} = contextFactory(contextState);

export {
    BreadcrumbProvider,
    useBreadcrumb,
};
export type {
    BreadcrumbElement,
} from './use-breadcrumb';
