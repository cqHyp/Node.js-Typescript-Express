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
const adminEntity_1 = require("../models/adminEntity");
const SMSCodeEntity_1 = require("../models/SMSCodeEntity");
const HttpException_1 = require("../exceptions/HttpException");
const crypto = require("crypto");
const uuid_1 = require("uuid");
const smsCodeController_1 = require("./smsCodeController");
let AdminController = (() => {
    class AdminController {
    }
    AdminController.adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.account) {
            return next(new HttpException_1.default(500, -1, "请输入账号"));
        }
        if (!req.body.password) {
            return next(new HttpException_1.default(500, -1, "请输入密码"));
        }
        adminEntity_1.default.findOne({
            where: {
                mobile: req.body.account,
                password: crypto.createHash("md5").update(req.body.password).digest("hex")
            },
            attributes: {
                exclude: ["password"]
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException_1.default(200, 0, result.get("token")));
            }
            else {
                res.send(new HttpException_1.default(200, -1, "账号密码不正确"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    AdminController.adminLoginBySMS = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.account) {
            return next(new HttpException_1.default(500, -1, "请输入手机号"));
        }
        if (!req.body.code) {
            return next(new HttpException_1.default(500, -1, "请输入验证码"));
        }
        adminEntity_1.default.findOne({
            where: {
                mobile: req.body.account
            }
        }).then(result => {
            if (result) {
                SMSCodeEntity_1.default.findOne({
                    where: {
                        mobile: req.body.account
                    },
                    order: [['createdAt', 'desc']]
                }).then(smsResult => {
                    if (smsResult) {
                        if (smsResult.get("code") == req.body.code) {
                            let codeCreateAt = smsResult.get("createdAt");
                            let exTime = new Date(new Date().getTime() - 5 * 60 * 1000);
                            if (codeCreateAt > exTime) {
                                adminEntity_1.default.upsert({
                                    id: result.get("id"),
                                    token: uuid_1.v4(),
                                }, {
                                    fields: ["token"]
                                }).then(upsertResult => {
                                    res.send(new HttpException_1.default(200, 0, "调用成功", upsertResult[0].get("token")));
                                }).catch(err => {
                                    next(new HttpException_1.default(500, -1, err));
                                });
                            }
                            else {
                                res.send(new HttpException_1.default(200, -1, "验证码已过期，请重新获取"));
                            }
                        }
                        else {
                            res.send(new HttpException_1.default(200, -1, "验证码不正确"));
                        }
                    }
                    else {
                        res.send(new HttpException_1.default(200, -1, "请先获取验证码"));
                    }
                }).catch(error => {
                    next(new HttpException_1.default(500, -1, error));
                });
            }
            else {
                res.send(new HttpException_1.default(200, -1, "用户不存在"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    AdminController.adminRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.mobile) {
            return next(new HttpException_1.default(500, -1, "请输入手机号"));
        }
        if (!req.body.code) {
            return next(new HttpException_1.default(500, -1, "请输入验证码"));
        }
        adminEntity_1.default.findOne({
            where: {
                mobile: req.body.mobile
            }
        }).then(result => {
            if (!result) {
                smsCodeController_1.default.checkSMSCorrect(req.body.code, req.body.mobile).then(() => {
                    adminEntity_1.default.upsert({
                        account: req.body.mobile,
                        mobile: req.body.mobile,
                        password: crypto.createHash("md5").update("123456").digest("hex")
                    });
                }).catch((err) => {
                    next(err);
                });
            }
            else {
                next(new HttpException_1.default(500, -1, "手机号已被注册"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    return AdminController;
})();
exports.default = AdminController;
