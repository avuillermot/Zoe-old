import mongoose from 'mongoose';
import moment from 'moment';

const UserSchema = new mongoose.Schema({
	lastName: String,
	firstName: String,
	email: String,
	username: String,
	password: String,
	phone: String,
	allowGdpr: Boolean,
	isCheck: Boolean,
	created: { type: Date, default: moment().utc() },
	updated: { type: Date, default: moment().utc() },
	lastConnect: Date,
	group: { type: String, default: 'user' }
});

export interface IIUser extends mongoose.Document {
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

export default mongoose.model<IIUser>('Users', UserSchema);