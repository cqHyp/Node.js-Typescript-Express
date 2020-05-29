"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, code, message, data) {
        super(message);
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
exports.default = HttpException;
