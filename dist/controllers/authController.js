"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../exceptions/HttpException");
const config_1 = require("../config");
const axios_1 = require("axios");
const userEntity_1 = require("../models/userEntity");
const uuid_1 = require("uuid");
const baseController_1 = require("./baseController");
const WXBizDataCrypt_1 = require("../utils/WXBizDataCrypt");
let AuthController = (() => {
    class AuthController extends baseController_1.default {
    }
    AuthController.wxLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.code) {
            return next(new HttpException_1.default(500, -1, "code 不能为空"));
        }
        axios_1.default.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            method: "get",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                appid: config_1.appId,
                secret: config_1.secret,
                js_code: req.body.code,
                grant_type: "authorization_code"
            }
        }).then(result => {
            if (result.data) {
                userEntity_1.default.upsert({
                    openid: result.data.openid,
                    token: uuid_1.v4(),
                    session_key: result.data.session_key,
                    unionid: result.data.unionid
                }, {
                    fields: ["token", "session_key", "unionid"]
                }).then(fulfiled => {
                    res.send(new HttpException_1.default(200, 0, "调用成功", fulfiled[0]));
                }).catch(error => {
                    next(new HttpException_1.default(500, -1, error));
                });
            }
            else {
                next(new HttpException_1.default(500, -1, result.data));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    AuthController.wxInitUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.encryptedData) {
            return next(new HttpException_1.default(500, -1, "encryptedData 不能为空"));
        }
        if (!req.body.iv) {
            return next(new HttpException_1.default(500, -1, "iv 不能为空"));
        }
        baseController_1.default.verifyToken(req.body.token).then(userData => {
            let userInfo = userData;
            var pc = new WXBizDataCrypt_1.default(config_1.appId, userInfo.session_key);
            var data = pc.decryptData(req.body.encryptedData, req.body.iv);
            if (data) {
                userEntity_1.default.upsert({
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
                    res.send(new HttpException_1.default(200, 0, "调用成功", result[0]));
                }).catch(error => {
                    next(new HttpException_1.default(500, -1, error));
                });
            }
            else {
                next(new HttpException_1.default(500, -1, "系统错误"));
            }
        }).catch(exce => {
            next(new HttpException_1.default(500, -1, exce));
        });
    });
    return AuthController;
})();
exports.default = AuthController;
