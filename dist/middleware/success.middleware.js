"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function successMiddleware(result, request, response, next) {
    const code = result.code || 0;
    const message = result.message || 'success';
    const data = result.data;
    console.log(result);
    response
        .status(200)
        .send({
        code,
        message,
        data
    });
}
exports.default = successMiddleware;
