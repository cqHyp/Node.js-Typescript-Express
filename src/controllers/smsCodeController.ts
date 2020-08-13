import { NextFunction, Response, Request } from "express";
import SMSCode from "../models/SMSCodeEntity";
import HttpException from "../exceptions/HttpException";
import { redisClient } from "../utils/redis";

class SMSCodeController {

    /**
     * 发送验证码
     */
    static sendSMSCode = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.mobile) {
            return next(new HttpException(500, -1, "请输入手机号"));
        }
        let key = req.ip + "_" + "SMS";
        SMSCodeController.checkSMS(key, req.body.mobile).then(() => {
            SMSCode.create({
                mobile: req.body.mobile,
                code: parseInt((Math.random() * (999999 - 100000 + 1) + 100000).toString(), 10)
            }).then(result => {
                res.send(new HttpException(200, 0, "发送成功"));
            }).catch(error => {
                next(new HttpException(500, -1, error));
            })
        }).catch((err: any) => {
            next(err);
        })
    }

    /**
     * checkSendMany
     */
    static checkSMS = (key: string, mobile: string) => {
        return new Promise((resolve, reject) => {
            redisClient.get(key, (err, val) => {
                if (err) {
                    reject(new HttpException(500, -1, err));
                } else {
                    if (!val) {
                        redisClient.set(key, mobile);
                        redisClient.expire(key, 60);
                        resolve();
                    } else {
                        if (val == mobile) {
                            reject(new HttpException(500, -1, "验证码已发送，请一分钟后重试"));
                        } else {
                            resolve();
                        }
                    }
                }
            })
        })
    }

    static checkSMSCorrect = (code: string, mobile: string) => {
        return new Promise((resolve, reject) => {
            SMSCode.findOne({
                where: {
                    mobile: mobile
                },
                order: [['createdAt', 'desc']]
            }).then(smsResult => {
                if (smsResult) {
                    let codeCreateAt = smsResult.get("createdAt");
                    let exTime = new Date(new Date().getTime() - 5 * 60 * 1000);
                    if (codeCreateAt > exTime) {
                        if (smsResult.get("code") == code){
                            resolve();
                        }else {
                            reject(new HttpException(200, -1, "验证码不正确"))
                        }
                    }else {
                        reject(new HttpException(200, -1, "验证码已过期，请重新获取"))
                    }
                } else {
                    reject(new HttpException(200, -1, "请先获取验证码"));
                }
            }).catch(error => {
                reject(new HttpException(500, -1, error));
            })
        })
    }
}

export default SMSCodeController;