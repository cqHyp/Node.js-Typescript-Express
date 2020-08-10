import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import { appId, secret } from "../config";
import axios from "axios";
import User from "../models/userEntity";
import { v4 as uuidv4 } from "uuid";
import baseController from "./baseController";
import WXBizDataCrypt from "../utils/WXBizDataCrypt"

class AuthController extends baseController {

    /**
     * code2Session
     * 获取微信openid返回登录验证信息token
     * @returns token
     */
    static wxLogin = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.code) {
            return next(new HttpException(500, -1, "code 不能为空"));
        }
        axios.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            method: "get",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                appid: appId,
                secret: secret,
                js_code: req.body.code,
                grant_type: "authorization_code"
            }
        }).then(result => {
            if (result.data) {
                User.upsert({
                    openid: result.data.openid,
                    token: uuidv4(),
                    session_key: result.data.session_key,
                    unionid: result.data.unionid
                }, {
                    fields: ["token", "session_key", "unionid"]
                }).then(fulfiled => {
                    res.send(new HttpException(200, 0, "调用成功", fulfiled[0]));
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

    /**
     * 完善认证信息
     * WXBizDataCrypt.ts
     * @returns 完善的信息
     */
    static wxInitUserInfo = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.encryptedData) {
            return next(new HttpException(500, -1, "encryptedData 不能为空"));
        }
        if (!req.body.iv) {
            return next(new HttpException(500, -1, "iv 不能为空"));
        }
        baseController.verifyToken(req.body.token).then(userData => {
            let userInfo: any = userData;
            var pc = new WXBizDataCrypt(appId, userInfo.session_key);
            var data = pc.decryptData(req.body.encryptedData, req.body.iv);
            if (data) {
                User.upsert({
                    openid: data.openId,
                    nickName: data.nickName,
                    language: data.language,
                    gender: data.gender,
                    country: data.country,
                    city: data.city,
                    avatarUrl: data.avatarUrl,
                    province: data.province
                }, {
                    fields: ["nickName", "language", "gender", "country", "city", "avatarUrl", "province"]
                }).then(result => {
                    res.send(new HttpException(200, 0, "调用成功", result[0]));
                }).catch(error => {
                    next(new HttpException(500, -1, error));
                })
            } else {
                next(new HttpException(500, -1, "系统错误"));
            }
        }).catch(exce => {
            next(new HttpException(500, -10023, "token已过期"));
        })
    }
}

export default AuthController;