import { Request, Response, NextFunction } from "express";
import tDailyB from "../models/tdailybEntity"
import HttpException from "../exceptions/HttpException";
import BaseController from "./baseController";

class TDailyBController {

    /**
     * 获取当前用户日报列表
     */
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.uid) {
            return next(new HttpException(500, -1, "用户id不能为空！"));
        }
        tDailyB.findAll({
            where: {
                user_id: req.query.uid
            }
        }).then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 根据id获取日报详情
     */
    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "日报id不能为空！"));
        }
        tDailyB.findOne({
            where: {
                dailyB_id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "调用成功", result));
            } else {
                next(new HttpException(500, -1, "日报不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 创建日报
     */
    static createDailyB = async (req: Request, res: Response, next: NextFunction) => {
        tDailyB.create(req.body).then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 更新日报信息
     * id required: true
     */
    static updateDailyB = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "日报id不能为空！"));
        }
        tDailyB.update(req.query, {
            where: {
                dailyB_id: req.query.id
            }
        }).then((result: any) => {
            if (result[0]) {
                res.send(new HttpException(200, 0, "修改成功", null));
            } else {
                next(new HttpException(500, -1, "未找到日报"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 删除日报
     * id required: true
     */
    static deleteDailyB = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "日报id不能为空！"));
        }
        tDailyB.destroy({
            where: {
                dailyB_id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "删除成功", null));
            } else {
                next(new HttpException(500, -1, "未找到日报"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }
}

export default TDailyBController