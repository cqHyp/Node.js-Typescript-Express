import { Request, Response, NextFunction } from "express";
import User from "../models/userEntity"
import HttpException from "../exceptions/HttpException";
import BaseController from "./baseController";

class UserController {

    /**
     * 获取所有用户列表
     */
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        User.findAll().then(result => {
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
        User.findOne({
            where: {
                id: req.query.id
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
        User.create({
            openid: req.query.openid,
            status: 1
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
        User.update(req.query, {
            where: {
                id: req.query.id
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
        User.destroy({
            where: {
                id: req.query.id
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

    static getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
        BaseController.verifyToken(req.query.token).then(userData => {
            res.send(new HttpException(200, 0, "调用成功", userData));
        }).catch(exce => {
            console.error(exce);
            next(new HttpException(500, -10023, "token已过期"));
        })
    }
}

export default UserController