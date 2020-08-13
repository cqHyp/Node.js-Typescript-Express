"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userEntity_1 = require("../models/userEntity");
const adminEntity_1 = require("../models/adminEntity");
const HttpException_1 = require("../../dist/exceptions/HttpException");
let BaseController = (() => {
    class BaseController {
    }
    BaseController.verifyToken = function verifyToken(token) {
        return new Promise((resolve, reject) => {
            if (!token)
                return reject(new HttpException_1.default(500, -1, "token 为空"));
            userEntity_1.default.findOne({
                where: {
                    token: token
                },
                attributes: {
                    exclude: ["password"]
                }
            }).then(res => {
                if (res) {
                    let userData = res;
                    resolve(userData);
                }
                else {
                    reject(new HttpException_1.default(500, -10023, "token失效"));
                }
            }).catch(err => {
                reject(new HttpException_1.default(500, -1, err));
            });
        });
    };
    BaseController.verifyAdminTokenn = function verifyAdminToken(token) {
        return new Promise((resolve, reject) => {
            if (!token)
                return reject(new HttpException_1.default(500, -1, "token 为空"));
            adminEntity_1.default.findOne({
                where: {
                    token: token
                },
                attributes: {
                    exclude: ["password"]
                }
            }).then(res => {
                if (res) {
                    let userData = res;
                    resolve(userData);
                }
                else {
                    reject(new HttpException_1.default(500, -10023, "token失效"));
                }
            }).catch(err => {
                reject(new HttpException_1.default(500, -1, err));
            });
        });
    };
    return BaseController;
})();
exports.default = BaseController;
