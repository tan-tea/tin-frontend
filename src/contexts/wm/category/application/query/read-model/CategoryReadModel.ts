import { Category } from 'contexts/wm/category/domain/Category';

export class CategoryReadModel {
    readonly id: string;
    readonly label: string;
    readonly description: string;
    readonly banner: string;
    readonly position: number;
    readonly workspaceId: string;
    readonly createdAt: Date;

    constructor(category: Category) {
        const primitives = category.toPrimitives();

        this.id = primitives.id;
        this.label = primitives.label;
        this.description = primitives.description;
        this.banner = primitives.banner;
        this.position = primitives.position;
        this.workspaceId = primitives.workspaceId;
        this.createdAt = primitives.createdAt;
    }
}
