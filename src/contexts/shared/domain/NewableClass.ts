export interface NewableClass<T> extends Function {
	new (...args: Array<any>): T;
}
