import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import { appId, secret } from "../config";
import axios from "axios";
import User from "../models/userEntity";
import { v4 as uuidv4 } from "uuid";
import  WXBizDataCrypt from "../utils/WXBizDataCrypt"

class AuthController {

    /**
     * code2Session
     * 获取微信openid返回登录验证信息token
     * @returns token
     */
    static wxLogin = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.code) {
            return next(new HttpException(500, -1, "code 不能为空"));
        }
        axios.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            method: "get",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                appid: appId,
                secret: secret,
                js_code: req.query.code,
                grant_type: "authorization_code"
            }
        }).then(result => {
            if (result.data) {
                User.upsert({
                    openid: result.data.openid,
                    token: uuidv4()
                }, {
                    fields: ["token"]
                }).then(fulfiled => {
                    res.send(new HttpException(200, 0, "调用成功", fulfiled));
                }).catch(error => {
                    next(new HttpException(500, -1, error));
                })
            } else {
                next(new HttpException(500, -1, result.data));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    static wxInitUserInfo = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.encryptedData) {
            return next(new HttpException(500, -1, "encryptedData 不能为空"));
        }
        if (!req.query.iv) {
            return next(new HttpException(500, -1, "iv 不能为空"));
        }
    }
}

export default AuthController;