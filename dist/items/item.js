"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const ItemSchema = new mongoose_1.default.Schema({
    type: String,
    code: String,
    title: String,
    description: String,
    idUser: String,
    created: { type: Date, default: moment_1.default().utc() },
    updated: { type: Date, default: moment_1.default().utc() },
    deleted: { type: Boolean, default: false }
});
;
exports.default = mongoose_1.default.model('Items', ItemSchema);
