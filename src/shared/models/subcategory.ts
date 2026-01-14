import { Category } from './category';

export interface Subcategory {
    id: string;
    workspaceId: string;
    categoryId: string;
    category: Category;
    label: string;
    description: string;
    position: number;
    createdAt: Date;
}
