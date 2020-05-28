"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const code = error.code || -1;
    const message = error.message || '系统错误';
    response
        .status(status)
        .send({
        code,
        status,
        message
    });
}
exports.default = errorMiddleware;
