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
const tuserEntity_1 = require("../models/tuserEntity");
const HttpException_1 = require("../exceptions/HttpException");
let TUserController = (() => {
    class TUserController {
    }
    TUserController.listAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        tuserEntity_1.default.findAll().then(result => {
            res.send(new HttpException_1.default(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    TUserController.getOneById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "用户id不能为空！"));
        }
        tuserEntity_1.default.findOne({
            where: {
                user_id: req.query.id
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
    TUserController.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        tuserEntity_1.default.create({
            user_name: req.query.user_name,
            indate: req.query.indate,
            isactive: 1,
            memo: req.query.memo
        }).then(result => {
            res.send(new HttpException_1.default(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    TUserController.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "用户id不能为空！"));
        }
        tuserEntity_1.default.update(req.query, {
            where: {
                user_id: req.query.id
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
    TUserController.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "用户id不能为空！"));
        }
        tuserEntity_1.default.destroy({
            where: {
                user_id: req.query.id
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
    return TUserController;
})();
exports.default = TUserController;
