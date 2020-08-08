import User, { IUser, UserCheck } from "./../user/user";
import moment from "moment";

export default class ServiceUser {
    public async find(where: {}): Promise<IUser[]> {
        let data: IUser[] = [];
        let fn = async () => {
            data = await User.find(where).select("-password -phone -_id");
        };
        await fn();
        return data;
    }

    public async login(login: string, password: string): Promise<IUser[]> {
        let data:IUser[] = [];
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

    public async tryToRegister(user: IUser): Promise<{ result: boolean, messages: any }> {
        try {
            return await this.register(user);
        }
        catch (ex) {
            return {
                result: false, messages: []
            };
        }
    }

    public async register(user: IUser): Promise<{ result: boolean, messages: any }> {
        user.isCheck = false;
        user.allowGdpr = false;
        
        let answer: { result: boolean, messages: any } = await UserCheck(user);
        if (answer.result) await User.create(user);
        return answer;
    }
}