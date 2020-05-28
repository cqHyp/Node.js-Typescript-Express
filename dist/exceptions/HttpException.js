"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
        this.message = message;
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
exports.default = HttpException;
