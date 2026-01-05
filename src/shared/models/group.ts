import { Option } from './option';

export interface Group {
    id: string;
    name: string;
    description: string;
    required: boolean;
    min: number;
    max: number;
    createdAt: Date;
    options: Array<Option>;
}
