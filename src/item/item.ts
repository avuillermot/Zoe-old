import mongoose from 'mongoose';
import moment from 'moment';

const ItemSchema : mongoose.Schema = new mongoose.Schema({
	type: String,
	code: String,
	title: String,
	description: String,
	idUser: String,
	created: { type: Date, default: moment().utc() },
	updated: { type: Date, default: moment().utc() },
	deleted: { type: Boolean, default: false }
});

export interface IItem extends mongoose.Document {
	type: String,
	code: String,
	title: String,
	description: String,
	idUser: String,
	created: Date,
	updated: Date,
	deleted: Date
};

export default mongoose.model<IItem>('Items', ItemSchema);