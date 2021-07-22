import { Request, Response, NextFunction } from "express";
import tUser from "../models/tuserEntity"
import HttpException from "../exceptions/HttpException";
import BaseController from "./baseController";

class TUserController {

    /**
     * 获取所有用户列表
     */
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        tUser.findAll().then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 根据id获取用户详情
     */
    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "用户id不能为空！"));
        }
        tUser.findOne({
            where: {
                user_id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "调用成功", result));
            } else {
                next(new HttpException(500, -1, "用户不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 创建用户
     */
    static createUser = async (req: Request, res: Response, next: NextFunction) => {
        tUser.create({
            user_name: req.query.user_name,
            indate: req.query.indate,
            isactive: 1,
            memo: req.query.memo
        }).then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 更新用户信息
     * id required: true
     */
    static updateUser = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "用户id不能为空！"));
        }
        tUser.update(req.query, {
            where: {
                user_id: req.query.id
            }
        }).then((result: any) => {
            if (result[0]) {
                res.send(new HttpException(200, 0, "修改成功", null));
            } else {
                next(new HttpException(500, -1, "未找到用户"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 删除用户
     * id required: true
     */
    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "用户id不能为空！"));
        }
        tUser.destroy({
            where: {
                user_id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "删除成功", null));
            } else {
                next(new HttpException(500, -1, "未找到用户"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }
}

export default TUserController