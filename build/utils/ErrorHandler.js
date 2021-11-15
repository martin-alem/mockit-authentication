"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errorhandler extends Error {
    constructor(message, statusCode) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        return this;
    }
}
exports.default = Errorhandler;
