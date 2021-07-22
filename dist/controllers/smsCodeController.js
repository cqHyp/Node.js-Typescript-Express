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
const SMSCodeEntity_1 = require("../models/SMSCodeEntity");
const HttpException_1 = require("../exceptions/HttpException");
const redis_1 = require("../utils/redis");
let SMSCodeController = (() => {
    class SMSCodeController {
    }
    SMSCodeController.sendSMSCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.mobile) {
            return next(new HttpException_1.default(500, -1, "请输入手机号"));
        }
        let key = req.ip + "_" + "SMS";
        SMSCodeController.checkSMS(key, req.body.mobile).then(() => {
            SMSCodeEntity_1.default.create({
                mobile: req.body.mobile,
                code: parseInt((Math.random() * (999999 - 100000 + 1) + 100000).toString(), 10)
            }).then(result => {
                res.send(new HttpException_1.default(200, 0, "发送成功"));
            }).catch(error => {
                next(new HttpException_1.default(500, -1, error));
            });
        }).catch((err) => {
            next(err);
        });
    });
    SMSCodeController.getSMSCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.mobile) {
            return next(new HttpException_1.default(500, -1, "请输入手机号"));
        }
        SMSCodeEntity_1.default.findOne({
            where: {
                mobile: req.body.mobile
            },
            order: [['createdAt', 'desc']]
        }).then(smsResult => {
            if (smsResult) {
                res.send(new HttpException_1.default(200, 0, "登录成功", smsResult));
            }
            else {
                next(new HttpException_1.default(500, -1, "系统错误"));
            }
        });
    });
    SMSCodeController.checkSMS = (key, mobile) => {
        return new Promise((resolve, reject) => {
            redis_1.redisClient.get(key, (err, val) => {
                if (err) {
                    reject(new HttpException_1.default(500, -1, err));
                }
                else {
                    if (!val) {
                        redis_1.redisClient.set(key, mobile);
                        redis_1.redisClient.expire(key, 60);
                        resolve("success");
                    }
                    else {
                        if (val == mobile) {
                            reject(new HttpException_1.default(500, -1, "验证码已发送，请一分钟后重试"));
                        }
                        else {
                            resolve("success");
                        }
                    }
                }
            });
        });
    };
    SMSCodeController.checkSMSCorrect = (code, mobile) => {
        return new Promise((resolve, reject) => {
            SMSCodeEntity_1.default.findOne({
                where: {
                    mobile: mobile
                },
                order: [['createdAt', 'desc']]
            }).then(smsResult => {
                if (smsResult) {
                    let codeCreateAt = smsResult.get("createdAt");
                    let exTime = new Date(new Date().getTime() - 5 * 60 * 1000);
                    if (codeCreateAt > exTime) {
                        if (smsResult.get("code") == code) {
                            resolve(code);
                        }
                        else {
                            reject(new HttpException_1.default(200, -1, "验证码不正确"));
                        }
                    }
                    else {
                        reject(new HttpException_1.default(200, -1, "验证码已过期，请重新获取"));
                    }
                }
                else {
                    reject(new HttpException_1.default(200, -1, "请先获取验证码"));
                }
            }).catch(error => {
                reject(new HttpException_1.default(500, -1, error));
            });
        });
    };
    return SMSCodeController;
})();
exports.default = SMSCodeController;
