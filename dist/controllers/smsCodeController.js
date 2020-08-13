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
                        resolve();
                    }
                    else {
                        if (val == mobile) {
                            reject(new HttpException_1.default(500, -1, "验证码已发送，请一分钟后重试"));
                        }
                        else {
                            resolve();
                        }
                    }
                }
            });
        });
    };
    return SMSCodeController;
})();
exports.default = SMSCodeController;
