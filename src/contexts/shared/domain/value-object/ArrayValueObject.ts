export abstract class ArrayValueObject<T> {
    readonly value: ReadonlyArray<T>;

    constructor(value: Array<T>) {
        this.ensureValueIsDefined(value);
        this.ensureValueIsArray(value);

        this.value = Object.freeze(value.map((item) => this.cloneItem(item)));

        this.validate(this.value);
    }

    protected cloneItem(item: T): T {
        if (typeof item === 'object' && item !== null) {
            return Object.freeze({ ...(item as any) });
        }

        return item;
    }

    protected validate(_value: ReadonlyArray<T>): void {}

    protected newInstance(value: T[]): this {
        return new (this.constructor as any)(value);
    }

    private ensureValueIsDefined(value: Array<T>): void {
        if (value === null || value === undefined) {
            throw new Error('Value must be defined');
        }
    }

    private ensureValueIsArray(value: Array<T>): void {
        if (!Array.isArray(value)) {
            throw new Error('Value must be an array');
        }
    }

    equals(other: ArrayValueObject<T>): boolean {
        return JSON.stringify(this.value) === JSON.stringify(other.value);
    }

    toPrimitives(): T[] {
        return [...this.value];
    }

    add(item: T): this {
        return this.newInstance([...this.value, item]);
    }

    removeByIndex(index: number): this {
        return this.newInstance(this.value.filter((_, i) => i !== index));
    }
}
