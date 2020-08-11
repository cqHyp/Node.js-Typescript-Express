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
const userEntity_1 = require("../models/userEntity");
const HttpException_1 = require("../exceptions/HttpException");
const baseController_1 = require("./baseController");
let UserController = (() => {
    class UserController {
    }
    UserController.listAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        userEntity_1.default.findAll().then(result => {
            res.send(new HttpException_1.default(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    UserController.getOneById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "用户id不能为空！"));
        }
        userEntity_1.default.findOne({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException_1.default(200, 0, "调用成功", result));
            }
            else {
                next(new HttpException_1.default(500, -1, "用户不存在"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    UserController.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        userEntity_1.default.create({
            openid: req.query.openid,
            status: 1
        }).then(result => {
            res.send(new HttpException_1.default(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    UserController.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "用户id不能为空！"));
        }
        userEntity_1.default.update(req.query, {
            where: {
                id: req.query.id
            }
        }).then((result) => {
            if (result[0]) {
                res.send(new HttpException_1.default(200, 0, "修改成功", null));
            }
            else {
                next(new HttpException_1.default(500, -1, "未找到用户"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    UserController.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "用户id不能为空！"));
        }
        userEntity_1.default.destroy({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException_1.default(200, 0, "删除成功", null));
            }
            else {
                next(new HttpException_1.default(500, -1, "未找到用户"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    UserController.getUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        baseController_1.default.verifyToken(req.query.token).then(userData => {
            res.send(new HttpException_1.default(200, 0, "调用成功", userData));
        }).catch(exce => {
            console.error(exce);
            next(new HttpException_1.default(500, -10023, "token已过期"));
        });
    });
    return UserController;
})();
exports.default = UserController;
