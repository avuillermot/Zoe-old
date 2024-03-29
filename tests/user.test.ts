import "./../src/config"
import { expect } from 'chai';
import "mocha";
import Query from "./../src/user/user.serv";
import User, { IUser } from "./../src/user/user";
import Users from "./../src/user/users";

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

describe('Must have a error when create user', () => {

    it('should not create username test@hotmail.com (username already exists)', async () => {
        let user: IUser = new User();
        user.isCheck = false;
        user.email = "test-not-exist@hotmail.com";
        user.username = "test@hotmail.com";
        user.firstName = "John";
        user.lastName = "Doe";
        user.password = "12345";
        user.phone = "0380520356";
        let query:Query = new Query();
        const data = await query.tryToRegister(user);

        expect(data.result).equal(false);
        //if (data.result == false) console.log(data.messages);
    });

    it('should not create email test@hotmail.com (email already exists)', async () => {
        let user: IUser = new User();
        user.isCheck = false;
        user.email = "test@hotmail.com";
        user.username = "test-not-exist@hotmail.com";
        user.firstName = "John";
        user.lastName = "Doe";
        user.password = "12345";
        user.phone = "0380520356";
        let query: Query = new Query();
        const data = await query.tryToRegister(user);

        expect(data.result).equal(false);
        //if (data.result == false) console.log(data.messages);
    });

    it('should not create testhotmail.com account (bad mail)', async () => {
        let user: IUser = new User();
        user.isCheck = false;
        user.email = "testhotmail.com";
        user.username = "testhotmail.com";
        user.firstName = "John";
        user.lastName = "Doe";
        user.password = "12345";
        user.phone = "0380520356";
        let query: Query = new Query();

        const data = await query.tryToRegister(user);
        expect(data.result).equal(false);
        //if (data.result == false) console.log(data.messages);
    });

    it('should not create test@hotmail.com account (bad first name)', async () => {
        let user: IUser = new User();
        user.isCheck = false;
        user.email = "test@hotmail.com";
        user.username = "test@hotmail.com";
        user.lastName = "Doe";
        user.password = "12345";
        user.phone = "0380520356";
        let query: Query = new Query();

        const data = await query.tryToRegister(user);
        expect(data.result).equal(false);
        //if (data.result == false) console.log(data.messages);
    });

    it('should not create test@hotmail.com account (bad last mail)', async () => {
        let user: IUser = new User();
        user.isCheck = false;
        user.email = "test@hotmail.com";
        user.username = "test@hotmail.com";
        user.firstName = "John";
        user.password = "12345";
        user.phone = "0380520356";
        let query: Query = new Query();

        const data = await query.tryToRegister(user);
        expect(data.result).equal(false);
        //if (data.result == false) console.log(data.messages);
    });

    it('should not create test@hotmail.com account (password to short)', async () => {
        let user: IUser = new User();
        user.isCheck = false;
        user.email = "test@hotmail.com";
        user.username = "test@hotmail.com";
        user.firstName = "John";
        user.lastName = "Doe";
        user.password = "1234";
        user.phone = "0380520356";
        let query: Query = new Query();

        const data = await query.tryToRegister(user);
        expect(data.result).equal(false);
        //if (data.result == false) console.log(data.messages);
    });
});

describe('Must set email to checked password', () => {

    it('should update test@hotmail.com isCheck property', async () => {
        let query: Query = new Query();
        const data = await query.checkEmail("test@hotmail.com");
        expect(data).equal(true);
    });
});

describe('Must update user', () => {

    it('should update test@hotmail.com', async () => {
        let user: IUser = new User();
        user._id = "5f2e6e3f23333756b4f4a3d1";
        user.isCheck = false;
        user.email = "test@hotmail.com";
        user.username = "test@hotmail.com";
        user.firstName = "John";
        user.lastName = "Doe";
        user.password = "12345";
        user.phone = "0380520356";

        let query: Query = new Query();
        const data = await query.update(user);
        expect(data).equal(true);
    });
});

describe('Users collection', () => {
    it('should load one user', async () => {
        let users: Users = new Users();
        await users.load({ email: "test@hotmail.com" });
        expect(users.count()).equal(1);
    });
});