import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model';
import HttpException from '../exceptions/HttpException';
import axios from "axios";
import { appId, secret } from "../config/index";
import WXBizDataCrypt from "../utils/WXBizDataCrypt";

class AuthController {
    /**
     * 邮箱注册
     */
    static signup = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.email) {
            return next(new HttpException(400, -1, "邮箱不能为空", null));
        }
        if (!req.body.password) {
            return next(new HttpException(400, -1, "密码不能为空", null));
        }

        try {
            const user = await User.findOne({ email: req.body.email }).select('email password').exec();
            if (!user) {
                const user = await User.create(req.body);
                next(new HttpException(200, 0, "注册成功", user));
            } else {
                next(new HttpException(401, -1, "邮箱已被注册", null));
            }
        } catch (err) {
            next(new HttpException(500, -1, "注册失败", err.message));
        }
    }

    /**
     * 邮箱登录
     */
    static signin = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.email) {
            return next(new HttpException(400, -1, "邮箱不能为空!", null));
        }
        if (!req.body.password) {
            return next(new HttpException(400, -1, "密码不能为空", null));
        }

        try {
            let user: any = await User.findOne({ email: req.body.email }).select('email password').exec();
            if (!user) {
                next(new HttpException(401, -1, "用户不存在", null));
            } else {
                const match = await user.checkPassword(req.body.password);
                if (!match) {
                    next(new HttpException(401, -1, "账号密码不正确", null));
                } else {
                    next(new HttpException(200, 0, "登录成功"));
                }
            }
        } catch (err) {
            next(new HttpException(500, -1, err.message));
        }
    }

    /**
     * code换openid
     */
    static code2Session = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.code) {
            return next(new HttpException(400, -1, "code为空"));
        }

        try {
            let response = await axios({
                method: "GET",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                url: "https://api.weixin.qq.com/sns/jscode2session",
                data: {
                    appid: appId,
                    secret: secret,
                    js_code: req.body.code,
                    grant_type: "authorization_code"
                }
            });
            if (response.data.errcode == 0) {

            } else {
                next(new HttpException(500, response.data.errcode, response.data.errmsg));
            }
        } catch (err) {
            next(new HttpException(500, -1, err.message));
        }
    }

    /**
     * 微信授权认证信息
     * token
     * encryptedData
     * iv
     */
    static improveUserInfo = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.encryptedData) {
            return next(new HttpException(400, -1, "encryptedData not set"));
        }
        if (!req.body.iv) {
            return next(new HttpException(400, -1, "iv not set"));
        }
        try {
            const user: any = await User.findOne({ token: req.body.token });
            let decryData = new WXBizDataCrypt(appId, user.session_key).decryptData(req.body.encryptedData, req.body.iv);
            User.findOneAndUpdate({ _id: user._id }, {}, (err, result) => {
                
            })
        } catch (err) {

        }
    }
}

export default AuthController