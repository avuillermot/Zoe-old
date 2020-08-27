import User, { IUser } from "./user";
import Query from "./user.serv"
import Lists from "../lists";

export default class Users implements Lists<IUser> {
    
	protected users: IUser[];
	protected query: Query;

	constructor() {
		this.users = [];
		this.query = new Query();
	}

	public async load(where: {}): Promise<void> {
		this.users = await this.query.find(where);
	}

	public async getChecked(): Promise<void> {
		await this.load({ isCheck: true });
	}

	public count(): number {
		return this.users.length;
	}
}