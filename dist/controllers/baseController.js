"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userEntity_1 = require("../models/userEntity");
const adminEntity_1 = require("../models/adminEntity");
let BaseController = (() => {
    class BaseController {
    }
    BaseController.verifyToken = function verifyToken(token) {
        return new Promise((resolve, reject) => {
            if (!token)
                return reject("token 为空");
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
                    reject("用户不存在");
                }
            }).catch(err => {
                reject(err);
            });
        });
    };
    BaseController.verifyAdminTokenn = function verifyAdminToken(token) {
        return new Promise((resolve, reject) => {
            if (!token)
                return reject("token 为空");
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
                    reject("用户不存在");
                }
            }).catch(err => {
                reject(err);
            });
        });
    };
    return BaseController;
})();
exports.default = BaseController;
