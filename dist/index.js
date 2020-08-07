"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_item_1 = __importDefault(require("./server.item"));
const server_user_1 = __importDefault(require("./server.user"));
require("./config");
// items service
const server0 = new server_item_1.default(9000);
server0.start();
const server1 = new server_user_1.default(9001);
server1.start();
