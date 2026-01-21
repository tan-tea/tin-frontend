import { Category } from 'contexts/wm/category/domain/Category';

import { CategoryReadModel } from './CategoryReadModel';

export class CategoriesReadModel {
    readonly categories: Array<CategoryReadModel>;

    constructor(categories: Array<Category>) {
        this.categories = categories.map(
            (category) => category.toPrimitives()
        );
    }
}
