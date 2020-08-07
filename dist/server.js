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
const express_1 = __importDefault(require("express"));
const item_serv_1 = __importDefault(require("./item/item.serv"));
const server_base_1 = __importDefault(require("./server.base"));
/**
 * Allows to start an Express server
 */
class Server extends server_base_1.default {
    /**
     * Starts the server and does not return anything
     */
    start() {
        const app = express_1.default();
        // route for GET /
        // returns items
        app.get('/items', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let data = yield new item_serv_1.default().find({});
            response.send({ data: data });
        }));
        app.get('/users', (request, response) => __awaiter(this, void 0, void 0, function* () {
            let data = yield new item_serv_1.default().find({});
            response.send({ data: data });
        }));
        // Server is listening to port defined when Server was initiated
        app.listen(this.port, () => {
            console.log("Server is running on port " + this.port);
        });
    }
}
exports.default = Server;
