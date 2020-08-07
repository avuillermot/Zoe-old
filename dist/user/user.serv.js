"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importStar(require("./../user/user"));
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
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.isCheck = false;
            user.allowGdpr = false;
            let answer = yield user_1.UserCheck(user);
            if (answer.result)
                yield user_1.default.create(user);
            return answer;
        });
    }
}
exports.default = ServiceUser;
