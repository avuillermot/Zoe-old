import "./../src/config"
import { expect } from 'chai';
import "mocha";
import Query from "./../src/user/user.serv";
import User, { IUser } from "./../src/user/user";

describe('Must authenticate user', () => {

    it('should authenticate avuillermot@hotmail.com', async () => {
        let query:Query = new Query();
        const data = await query.login("avuillermot@hotmail.com","12345");
        expect(data.length).equal(1);
        expect(data[0]).to.have.property("password", undefined);
    });
});

describe('Must not find password', () => {

    it('should authenticate avuillermot@hotmail.com', async () => {
        let query:Query = new Query();
        const data = await query.find({ username: "avuillermot@hotmail.com", password: "12345" });
        expect(data[0]).to.have.property("password", undefined);
    });
});

describe('Must update password', () => {

    it('should update avuillermot@hotmail.com password', async () => {
        let query: Query = new Query();
        const data = await query.setPassword("avuillermot@hotmail.com", "12345");
        expect(data).equal(true);
    });
});

describe('Must create user', () => {

    it('should create test@hotmail.com account', async () => {
        let user: IUser = new User();
        user.isCheck = true;
        let query:Query = new Query();
        const data = await query.register(user);
        expect(data.result).equal(true);
    });
});