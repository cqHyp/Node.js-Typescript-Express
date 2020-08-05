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
let AuthController = (() => {
    class AuthController {
    }
    AuthController.wxLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        axios_1.default.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            method: "get",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                appid: config_1.appId,
                secret: config_1.secret,
                js_code: req.query.code,
                grant_type: "authorization_code"
            }
        }).then(result => {
            if (result.data) {
                userEntity_1.default.upsert({
                    openid: result.data.openid,
                    token: uuid_1.v4()
                }, {
                    fields: ["token"]
                }).then(fulfiled => {
                    console.log(fulfiled);
                    res.send(new HttpException_1.default(200, 0, "调用成功", fulfiled));
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
    return AuthController;
})();
exports.default = AuthController;
