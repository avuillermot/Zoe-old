import User, { IIUser } from "./../user/user";

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
}