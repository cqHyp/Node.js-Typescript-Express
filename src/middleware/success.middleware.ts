import { Request, Response, NextFunction } from "express";
import HttpSuccess from "../exceptions/HttpSuccess";

function successMiddleware(result: HttpSuccess, request: Request, response: Response, next: NextFunction) {
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
        })
}
export default successMiddleware