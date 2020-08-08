import mongoose from "mongoose";
import moment from "moment";
import { Validator, extend } from "node-input-validator";

const UserSchema = new mongoose.Schema({
	lastName: String,
	firstName: String,
	email: String,
	username: String,
	password: String,
	phone: String,
	allowGdpr: { type: Boolean, default: false },
	// email have been checked
	isCheck: Boolean,
	created: { type: Date, default: moment().utc() },
	updated: { type: Date, default: moment().utc() },
	lastConnect: Date,
	group: { type: String, default: 'user' }
});

const UserValidator = {
	email: 'required|email',
	lastName: 'required',
	firstName: 'required',
	username: 'required|minLength:3',
	password: 'required|minLength:5',
	phone: 'required',
	group: 'required',
	isCheck: 'required'
};

export async function UserCheck(user: IUser): Promise<{ result: boolean, messages: any }> {
	const validator: Validator = new Validator(user, UserValidator);
	let result: boolean = await validator.check();
	return { result: result, messages: validator.errors };
}

export interface IUser extends mongoose.Document {
	_id: String,
	lastName: String,
	firstName: String,
	email: String,
	username: String,
	password: String,
	phone: String,
	allowGdpr: Boolean,
	isCheck: Boolean,
	created: Date,
	updated: Date,
	lastConnect: Date,
	group: String
};


export default mongoose.model<IUser>('Users', UserSchema);