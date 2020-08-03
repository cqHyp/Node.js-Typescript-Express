import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const code = error.code;
    const message = error.message ? error.message : '系统错误';
    const data = error.data;
    response
        .status(status)
        .send({
            code,
            status,
            message,
            data
        })
}
export default errorMiddleware