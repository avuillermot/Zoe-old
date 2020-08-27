import mongoose from "mongoose";
import moment from "moment";

const LogSchema = new mongoose.Schema({
	code: String,
	message: String,
	idUser: String,
	created: { type: Date, default: moment().utc() }
});

export interface ILog extends mongoose.Document {
	_id: String,
	code: String,
	message: String,
	idUser: String,
	created: Date
};

export default mongoose.model<ILog>('Logs', LogSchema);