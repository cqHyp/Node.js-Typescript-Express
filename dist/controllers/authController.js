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
const user_model_1 = require("../models/user.model");
const HttpException_1 = require("../exceptions/HttpException");
const axios_1 = require("axios");
const index_1 = require("../config/index");
let AuthController = (() => {
    class AuthController {
    }
    AuthController.signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.email) {
            return next(new HttpException_1.default(400, -1, "邮箱不能为空", null));
        }
        if (!req.body.password) {
            return next(new HttpException_1.default(400, -1, "密码不能为空", null));
        }
        try {
            const user = yield user_model_1.default.findOne({ email: req.body.email }).select('email password').exec();
            if (!user) {
                const user = yield user_model_1.default.create(req.body);
                next(new HttpException_1.default(200, 0, "注册成功", user));
            }
            else {
                next(new HttpException_1.default(401, -1, "邮箱已被注册", null));
            }
        }
        catch (err) {
            next(new HttpException_1.default(500, -1, "注册失败", err.message));
        }
    });
    AuthController.signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.email) {
            return next(new HttpException_1.default(400, -1, "邮箱不能为空!", null));
        }
        if (!req.body.password) {
            return next(new HttpException_1.default(400, -1, "密码不能为空", null));
        }
        try {
            let user = yield user_model_1.default.findOne({ email: req.body.email }).select('email password').exec();
            if (!user) {
                next(new HttpException_1.default(401, -1, "用户不存在", null));
            }
            else {
                const match = yield user.checkPassword(req.body.password);
                if (!match) {
                    next(new HttpException_1.default(401, -1, "账号密码不正确", null));
                }
                else {
                    next(new HttpException_1.default(200, 0, "登录成功"));
                }
            }
        }
        catch (err) {
            next(new HttpException_1.default(500, -1, err.message));
        }
    });
    AuthController.code2Session = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.code) {
            return next(new HttpException_1.default(400, -1, "code为空"));
        }
        try {
            let response = yield axios_1.default({
                method: "GET",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                url: "https://api.weixin.qq.com/sns/jscode2session",
                data: {
                    appid: index_1.appId,
                    secret: index_1.secret,
                    js_code: req.body.code,
                    grant_type: "authorization_code"
                }
            });
            if (response.data.errcode == 0) {
            }
            else {
                next(new HttpException_1.default(500, response.data.errcode, response.data.errmsg));
            }
        }
        catch (err) {
            next(new HttpException_1.default(500, -1, err.message));
        }
    });
    AuthController.improveUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.encryptedData) {
            return next(new HttpException_1.default(400, -1, "encryptedData not set"));
        }
        if (!req.body.iv) {
            return next(new HttpException_1.default(400, -1, "iv not set"));
        }
        try {
        }
        catch (err) {
        }
    });
    return AuthController;
})();
exports.default = AuthController;
