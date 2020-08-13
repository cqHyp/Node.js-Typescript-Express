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
}

export default SMSCodeController;