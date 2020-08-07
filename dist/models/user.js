"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const UserSchema = new mongoose_1.default.Schema({
    lastName: String,
    firstName: String,
    email: String,
    username: String,
    password: String,
    phone: String,
    allowGdpr: Boolean,
    isCheck: Boolean,
    created: { type: Date, default: moment_1.default().utc() },
    updated: { type: Date, default: moment_1.default().utc() },
    lastConnect: Date,
    group: { type: String, default: 'user' }
});
;
const AppUsers = mongoose_1.default.model('Users', UserSchema);
