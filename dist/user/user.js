"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCheck = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const node_input_validator_1 = require("node-input-validator");
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
function UserCheck(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const validator = new node_input_validator_1.Validator(user, UserValidator);
        let result = yield validator.check();
        return { result: result, messages: validator.errors };
    });
}
exports.UserCheck = UserCheck;
;
exports.default = mongoose_1.default.model('Users', UserSchema);
