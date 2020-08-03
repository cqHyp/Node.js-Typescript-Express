import { Request, Response, NextFunction } from "express";
import User from '../models/user.model';
import HttpException from "../exceptions/HttpException";
import HttpSuccess from "../exceptions/HttpSuccess";
const db = require("../sql/dbConfig");

class UserController {

    /**
     * 获取所有用户
     */
    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        let sql = 'select * from user';
        let data = [];
        db.base(sql, data, (result) => {
            if (result) {
                res.send(new HttpException(200, 0, "调用成功", result));
            } else {
                next(new HttpException(500, -1, "系统错误"));
            }
        });
    }

    /**
     * 
     */
    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        let sql = 'select * from user where id = ?';
        let data = [req.query.id];
        db.base(sql, data, (result) => {
            if (result) {
                if (result.length > 0) {
                    res.send(new HttpException(200, 0, "调用成功", result[0]));
                } else {
                    next(new HttpException(500, -1, "用户不存在"));
                }
            } else {
                next(new HttpException(500, -1, "系统错误"));
            }
        })
    }

    static newUser = async (req: Request, res: Response, next: NextFunction) => {
        let newUser = new User(req.body);
        newUser.save((err, info) => {
            if (err) {
                next(new HttpException(500, -1, err));
            } else {
                res.send(new HttpException(200, 0, "调用成功", info));
            }
        })
    }

    static editUser = async (req: Request, res: Response, next: NextFunction) => {
        User.findByIdAndUpdate({ _id: req.query.id, }, req.body, (err, result) => {
            if (err) {
                next(new HttpException(500, -1, "系统错误"));
            } else {
                res.send(new HttpException(200, 0, "调用成功", result));
            }
        })
    }

    static delUser = async (req: Request, res: Response, next: NextFunction) => {
        User.remove({ _id: req.query.id }, (err) => {
            if (err) {
                next(new HttpException(500, -1, "系统错误"));
            } else {
                res.send(new HttpException(200, 0, "调用成功", null))
            }
        })
    }
}

export default UserController