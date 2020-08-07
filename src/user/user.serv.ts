import User, { IIUser } from "./../user/user";
import moment from "moment";

export default class ServiceUser {
    public async find(where: {}): Promise<IIUser[]> {
        let data: IIUser[] = [];
        let fn = async () => {
            data = await User.find(where).select("-password -phone -_id");
        };
        await fn();
        return data;
    }

    public async login(login: string, password: string): Promise<IIUser[]> {
        let data:IIUser[] = [];
        let fn = async () => {
            data = await User.find({ username: login, password: password }).select("-password -phone -_id");
        };
        await fn();
        return data;
    }

    public async setPassword(login: string, password: string): Promise<boolean> {
        let data = { n: 0, ok: 0 };
        let fn = async () => {
            data = await User.updateOne({ username: login }, { password: password });
        };
        await fn();
        return (data.n == data.ok);
    }
}