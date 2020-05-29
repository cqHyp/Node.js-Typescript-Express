"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const code = error.code;
    const message = error.message || '系统错误';
    const data = error.data;
    response
        .status(status)
        .send({
        code,
        status,
        message,
        data
    });
}
exports.default = errorMiddleware;
