import { Request, Response, NextFunction } from "express";
import User from '../models/user.model';
import HttpException from "../exceptions/HttpException";
import HttpSuccess from "../exceptions/HttpSuccess";

class UserController {

    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        User.find({}, (err, allInfo) => {
            if (err) {
                next(new HttpException(500, -1, "系统错误"));
            }
            res.send(new HttpSuccess(0, "调用成功", allInfo));
        })
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        User.findById(req.query.id, (err, allInfo) => {
            if (err) {
                next(new HttpException(500, -1, "系统错误"));
            }
            res.send(new HttpSuccess(0, "调用成功", allInfo));
        })
    }

    static newUser = async (req: Request, res: Response, next: NextFunction) => {
        let newUser = new User(req.body);
        newUser.save((err, info) => {
            if (err) {
                next(new HttpException(500, -1, "系统错误"));
            }
            res.send(new HttpSuccess(0, "调用成功", info));
        })
    }

    static editUser = async (req: Request, res: Response, next: NextFunction) => {
        User.findByIdAndUpdate({ _id: req.query.id, }, req.body, (err, result) => {
            if (err) {
                next(new HttpException(500, -1, "系统错误"));
            }
            res.send(new HttpSuccess(0, "调用成功", result));
        })
    }

    static delUser = async (req: Request, res: Response, next: NextFunction) => {
        User.remove({ _id: req.query.id }, (err) => {
            if (err) {
                next(new HttpException(500, -1, "系统错误"));
            }
            res.send(new HttpSuccess(0, "调用成功", null))
        })
    }
}

export default UserController