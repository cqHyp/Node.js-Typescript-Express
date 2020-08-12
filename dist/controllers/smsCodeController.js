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
let SMSCodeController = (() => {
    class SMSCodeController {
    }
    SMSCodeController.sendSMSCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.body.mobile) {
            return next(new HttpException_1.default(500, -1, "请输入手机号"));
        }
        SMSCodeEntity_1.default.create({
            mobile: req.body.mobile,
            code: Math.random().toString().slice(-6)
        }).then(result => {
            res.send(new HttpException_1.default(200, 0, "发送成功"));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    return SMSCodeController;
})();
exports.default = SMSCodeController;
