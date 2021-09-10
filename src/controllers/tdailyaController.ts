import { Request, Response, NextFunction, query } from "express";
import tDailyA from "../models/tdailyaEntity"
import HttpException from "../exceptions/HttpException";
import BaseController from "./baseController";
import * as moment from "moment";

class TUserController {

    /**
     * 获取当前用户日报列表
     */
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.uid) {
            return next(new HttpException(500, -1, "用户id不能为空！"));
        }
        let startDate = moment(req.query.startDate + "").format("YYYY-MM-DD 00:00:00");
        let endDate = moment(req.query.endDate + "").format("YYYY-MM-DD 23:59:59");
        console.warn(startDate, endDate);
        tDailyA.findAll({
            where: {
                user_id: req.query.uid,
                report_date: {
                    $lte: endDate,
                    $gte: startDate
                }
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
        tDailyA.findOne({
            where: {
                dailyA_id: req.query.id
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
    static createDailyA = async (req: Request, res: Response, next: NextFunction) => {
        tDailyA.create(req.body).then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 更新日报信息
     * id required: true
     */
    static updateDailyA = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "日报id不能为空！"));
        }
        tDailyA.update(req.query, {
            where: {
                dailyA_id: req.query.id
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
    static deleteDailyA = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "日报id不能为空！"));
        }
        tDailyA.destroy({
            where: {
                dailyA_id: req.query.id
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

export default TUserController