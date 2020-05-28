import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const code = error.code || -1;
    const message = error.message || '系统错误';
    response
        .status(status)
        .send({
            code,
            status,
            message
        })
}
export default errorMiddleware