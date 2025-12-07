import { ShopReadModel } from 'contexts/vm/shop/application/query/read-model/ShopReadModel';

import { Workspace } from './workspace';
import { Address } from './address';
import { Geolocation } from './geolocation';

export interface Shop extends ShopReadModel {
    slug: string;
    workspace: Workspace;
    workspaceId: string;
    address: Address;
    addressId: string;
    geolocation: Geolocation;
    geolocationId: string;
}
