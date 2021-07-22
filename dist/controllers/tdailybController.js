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
const tdailybEntity_1 = require("../models/tdailybEntity");
const HttpException_1 = require("../exceptions/HttpException");
let TDailyBController = (() => {
    class TDailyBController {
    }
    TDailyBController.listAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.uid) {
            return next(new HttpException_1.default(500, -1, "用户id不能为空！"));
        }
        tdailybEntity_1.default.findAll({
            where: {
                user_id: req.query.uid
            }
        }).then(result => {
            res.send(new HttpException_1.default(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    TDailyBController.getOneById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "日报id不能为空！"));
        }
        tdailybEntity_1.default.findOne({
            where: {
                dailyB_id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException_1.default(200, 0, "调用成功", result));
            }
            else {
                next(new HttpException_1.default(500, -1, "日报不存在"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    TDailyBController.createDailyB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        tdailybEntity_1.default.create(req.body).then(result => {
            res.send(new HttpException_1.default(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    TDailyBController.updateDailyB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "日报id不能为空！"));
        }
        tdailybEntity_1.default.update(req.query, {
            where: {
                dailyB_id: req.query.id
            }
        }).then((result) => {
            if (result[0]) {
                res.send(new HttpException_1.default(200, 0, "修改成功", null));
            }
            else {
                next(new HttpException_1.default(500, -1, "未找到日报"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    TDailyBController.deleteDailyB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "日报id不能为空！"));
        }
        tdailybEntity_1.default.destroy({
            where: {
                dailyB_id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException_1.default(200, 0, "删除成功", null));
            }
            else {
                next(new HttpException_1.default(500, -1, "未找到日报"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    return TDailyBController;
})();
exports.default = TDailyBController;
