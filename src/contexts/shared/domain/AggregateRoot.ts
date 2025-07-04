export abstract class AggregateRoot {
    abstract toPrimitives(): Record<string, unknown>;
    // abstract fromPrimitives(
    //     primitives: Record<string, unknown>
    // ): this;
}
