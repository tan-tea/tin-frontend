import { Managed, } from './Managed';

export interface History extends Omit<Managed, 'createdBy' | 'modifiedBy'> {
    key: string;
    url: string;
    path: string;
    params?: Array<string>;
    hash?: string;
}
