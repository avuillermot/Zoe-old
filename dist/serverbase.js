"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerBase {
    /**
     * Server's constructor.
     * It takes a number as parameter.
     * It cannot take any other type else the project won't compile
     */
    constructor(port) {
        this.port = port;
    }
}
exports.default = ServerBase;
