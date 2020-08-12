import { NextFunction, Response, Request } from "express";
import SMSCode from "../models/SMSCodeEntity";
import HttpException from "../exceptions/HttpException";

class SMSCodeController {

    /**
     * 发送验证码
     */
    static sendSMSCode = async (req: Request, res: Response, next: NextFunction) => {
        if(!req.body.mobile) {
            return next(new HttpException(500, -1, "请输入手机号"));
        }

        SMSCode.create({
            mobile: req.body.mobile,
            code: Math.random().toString().slice(-6)
        }).then(result => {
            res.send(new HttpException(200, 0, "发送成功"));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }
}

export default SMSCodeController;