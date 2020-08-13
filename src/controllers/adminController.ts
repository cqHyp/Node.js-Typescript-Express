import { NextFunction, Response, Request } from "express";
import Admin from "../models/adminEntity";
import SMSCode from "../models/SMSCodeEntity";
import HttpException from "../exceptions/HttpException";
import * as crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import SMSCodeController from "./smsCodeController";

class AdminController {

    /**
     * 管理员账号密码登录
     */
    static adminLogin = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.account) {
            return next(new HttpException(500, -1, "请输入账号"));
        }
        if (!req.body.password) {
            return next(new HttpException(500, -1, "请输入密码"));
        }
        Admin.findOne({
            where: {
                mobile: req.body.account,
                password: crypto.createHash("md5").update(req.body.password).digest("hex")
            },
            attributes: {
                exclude: ["password"]
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, result.get("token")));
            } else {
                res.send(new HttpException(200, -1, "账号密码不正确"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 管理员验证码登录
     */
    static adminLoginBySMS = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.account) {
            return next(new HttpException(500, -1, "请输入手机号"));
        }
        if (!req.body.code) {
            return next(new HttpException(500, -1, "请输入验证码"));
        }
        Admin.findOne({
            where: {
                mobile: req.body.account
            }
        }).then(result => {
            if (result) {
                SMSCode.findOne({
                    where: {
                        mobile: req.body.account
                    },
                    order: [['createdAt', 'desc']]
                }).then(smsResult => {
                    if (smsResult) {
                        if (smsResult.get("code") == req.body.code) {
                            // 登录成功
                            let codeCreateAt = smsResult.get("createdAt");
                            let exTime = new Date(new Date().getTime() - 5 * 60 * 1000);
                            if (codeCreateAt > exTime) {
                                Admin.upsert({
                                    id: result.get("id"),
                                    token: uuidv4(),
                                }, {
                                    fields: ["token"]
                                }).then(upsertResult => {
                                    res.send(new HttpException(200, 0, "调用成功", upsertResult[0].get("token")));
                                }).catch(err => {
                                    next(new HttpException(500, -1, err));
                                })
                            } else {
                                res.send(new HttpException(200, -1, "验证码已过期，请重新获取"));
                            }
                        } else {
                            // 验证码不正确
                            res.send(new HttpException(200, -1, "验证码不正确"));
                        }
                    } else {
                        res.send(new HttpException(200, -1, "请先获取验证码"));
                    }
                }).catch(error => {
                    next(new HttpException(500, -1, error));
                })
            } else {
                res.send(new HttpException(200, -1, "用户不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 管理员注册
     */
    static adminRegister = async (req: Request, res: Response, next: NextFunction) => {
        if(!req.body.mobile) {
            return next(new HttpException(500, -1, "请输入手机号"));
        }
        if (!req.body.code) {
            return next(new HttpException(500, -1, "请输入验证码"));
        }
        Admin.findOne({
            where: {
                mobile: req.body.mobile
            }
        }).then(result => {
            if (!result) {
                SMSCodeController.checkSMSCorrect(req.body.code, req.body.mobile).then(() => {
                    Admin.upsert({
                        account: req.body.mobile,
                        mobile: req.body.mobile,
                        password: crypto.createHash("md5").update("123456").digest("hex")
                    })
                }).catch((err: any) => {
                    next(err);
                })
            } else {
                // 手机号已被注册
                next(new HttpException(500, -1, "手机号已被注册"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }
}

export default AdminController;