import { Managed, } from './Managed';

export type Gender = 'male' | 'female' | 'non_binary';

export type UserStatus = 'ban' | 'active' | 'inactive';

export interface User extends Managed {
    readonly ID?: string;
    name?: string;
    givenName: string;
    middleName?: string;
    familyName: string;
    nickname?: string;
    preferredUsername: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    profile?: string;
    website?: string;
    picture?: string;
    birthdate?: string;
    gender?: Gender;
    status?: UserStatus;
    lastSeen?: string;
    online?: boolean;
    emailVerified?: boolean;
    phoneNumberVerified?: boolean;
    address?: any;
    workspaces?: Array<any>;
    preferences?: any;
}