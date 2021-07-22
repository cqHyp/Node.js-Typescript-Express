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
const tdailyaEntity_1 = require("../models/tdailyaEntity");
const HttpException_1 = require("../exceptions/HttpException");
const moment = require("moment");
let TUserController = (() => {
    class TUserController {
    }
    TUserController.listAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.uid) {
            return next(new HttpException_1.default(500, -1, "用户id不能为空！"));
        }
        let startDate = moment(req.query.startDate + "").format("YYYY-MM-DD 00:00:00");
        let endDate = moment(req.query.endDate + "").format("YYYY-MM-DD 23:59:59");
        console.warn(startDate, endDate);
        tdailyaEntity_1.default.findAll({
            where: {
                user_id: req.query.uid,
                report_date: {
                    $lt: endDate,
                    $gt: startDate
                }
            }
        }).then(result => {
            res.send(new HttpException_1.default(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    TUserController.getOneById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "日报id不能为空！"));
        }
        tdailyaEntity_1.default.findOne({
            where: {
                dailyA_id: req.query.id
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
    TUserController.createDailyA = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        tdailyaEntity_1.default.create(req.body).then(result => {
            res.send(new HttpException_1.default(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    TUserController.updateDailyA = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "日报id不能为空！"));
        }
        tdailyaEntity_1.default.update(req.query, {
            where: {
                dailyA_id: req.query.id
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
    TUserController.deleteDailyA = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "日报id不能为空！"));
        }
        tdailyaEntity_1.default.destroy({
            where: {
                dailyA_id: req.query.id
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
    return TUserController;
})();
exports.default = TUserController;
