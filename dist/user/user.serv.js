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
const user_1 = __importDefault(require("./../user/user"));
class ServiceUser {
    find(where) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            let fn = () => __awaiter(this, void 0, void 0, function* () {
                data = yield user_1.default.find(where).select("-password -phone -_id");
            });
            yield fn();
            return data;
        });
    }
    login(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = [];
            let fn = () => __awaiter(this, void 0, void 0, function* () {
                data = yield user_1.default.find({ username: login, password: password }).select("-password -phone -_id");
            });
            yield fn();
            return data;
        });
    }
    setPassword(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = { n: 0, ok: 0 };
            let fn = () => __awaiter(this, void 0, void 0, function* () {
                data = yield user_1.default.updateOne({ username: login }, { password: password });
            });
            yield fn();
            return (data.n == data.ok);
        });
    }
}
exports.default = ServiceUser;
