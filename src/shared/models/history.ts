import { Managed, } from './managed';

export interface History extends Omit<Managed, 'createdBy' | 'modifiedBy'> {
    key: string;
    url: string;
    path: string;
    params?: string;
    hash?: string;
}
