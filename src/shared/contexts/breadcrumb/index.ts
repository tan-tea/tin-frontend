import contextFactory from 'shared/contexts/contextFactory';
import useBreadcrumbContextState from 'shared/contexts/breadcrumb/useBreadcrumbContextState';

const {
    Provider: BreadcrumbProvider,
    useContext: useBreadcrumb,
} = contextFactory(useBreadcrumbContextState);

export {
    BreadcrumbProvider,
    useBreadcrumb,
};
export type {
    BreadcrumbElement,
} from './useBreadcrumbContextState';
