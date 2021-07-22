import { NextFunction, Response, Request } from "express";
import Admin from "../models/adminEntity";
import SMSCode from "../models/SMSCodeEntity";
import HttpException from "../exceptions/HttpException";
import * as crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import SMSCodeController from "./smsCodeController";
import tUser from "../models/tuserEntity";

class AdminController {

    /**
     * 测试账号密码登录
     */
     static adminLogin = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.account) {
            return next(new HttpException(500, -1, "请输入账号"));
        }
        if (!req.body.password) {
            return next(new HttpException(500, -1, "请输入密码"));
        }
        tUser.findOne({
            where: {
                user_name: req.body.account,
                password: req.body.password
            },
            attributes: {
                exclude: ["password"]
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "登录成功", result.get("user_id")));
            } else {
                res.send(new HttpException(200, -1, "账号密码不正确"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 管理员账号密码登录
     */
    // static adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    //     if (!req.body.account) {
    //         return next(new HttpException(500, -1, "请输入账号"));
    //     }
    //     if (!req.body.password) {
    //         return next(new HttpException(500, -1, "请输入密码"));
    //     }
    //     Admin.findOne({
    //         where: {
    //             mobile: req.body.account,
    //             password: crypto.createHash("md5").update(req.body.password).digest("hex")
    //         },
    //         attributes: {
    //             exclude: ["password"]
    //         }
    //     }).then(result => {
    //         if (result) {
    //             res.send(new HttpException(200, 0, "登录成功", result.get("token")));
    //         } else {
    //             res.send(new HttpException(200, -1, "账号密码不正确"));
    //         }
    //     }).catch(error => {
    //         next(new HttpException(500, -1, error));
    //     })
    // }

    /**
     * 管理员验证码登录
     */
    static adminLoginBySMS = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.account) {
            return next(new HttpException(200, -1, "请输入手机号"));
        }
        if (!req.body.code) {
            return next(new HttpException(200, -1, "请输入验证码"));
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
     * @param (mobile 手机号 String)
     * @param (code 验证码 String)
     * @returns token
     */
    static adminRegister = async (req: Request, res: Response, next: NextFunction) => {
        if(!req.body.mobile) {
            return next(new HttpException(200, -1, "请输入手机号"));
        }
        if (!req.body.code) {
            return next(new HttpException(200, -1, "请输入验证码"));
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
                        password: crypto.createHash("md5").update("12345678").digest("hex"),
                        token: uuidv4()
                    }).then(upsertResult => {
                        res.send(new HttpException(200, 0, "注册成功", upsertResult[0].get("token")));
                    }).catch(error => {
                        next(new HttpException(500, -1, error));
                    })
                }).catch((err: any) => {
                    next(err);
                })
            } else {
                // 手机号已被注册
                next(new HttpException(200, -1, "手机号已被注册"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    // /**
    //  * 获取管理员信息
    //  */
    // static getAdminUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    //     Admin.findOne({
    //         where: {
    //             token: req.query.token
    //         },
    //         attributes: {
    //             exclude: ["password"]
    //         }
    //     }).then(result => {
    //         if(result) {
    //             res.send(new HttpException(200, 0, "获取成功", result));
    //         }else {
    //             next(new HttpException(200, -1, "token无效"));
    //         }
    //     }).catch(error => {
    //         next(new HttpException(500, -1, error));
    //     })
    // }

     /**
     * 获取管理员信息
     */
      static getAdminUserInfo = async (req: Request, res: Response, next: NextFunction) => {
        tUser.findOne({
            where: {
                user_id: req.query.token
            },
            attributes: {
                exclude: ["password"]
            }
        }).then(result => {
            if(result) {
                res.send(new HttpException(200, 0, "获取成功", result));
            }else {
                next(new HttpException(200, -1, "token无效"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }
}

export default AdminController;