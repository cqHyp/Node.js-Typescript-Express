import { Request, Response, NextFunction } from "express";
import tIteration from "../models/tIteration"
import HttpException from "../exceptions/HttpException";
import BaseController from "./baseController";

class tIterationController {
    /**
    * 获取迭代列表
    */
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        let queryObject = {};
        let state = -1;
        if (req.query.state) {
            queryObject["state"] = Number(req.query.state);
        }
        tIteration.findAll({
            where: queryObject
        }).then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }
}

export default tIterationController;