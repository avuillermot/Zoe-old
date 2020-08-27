export default interface IList<T> {
	load(where: {}): Promise<void>;

	count(): number;
}