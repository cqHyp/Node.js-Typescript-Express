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
const screwEntity_1 = require("../models/screwEntity");
let ScrewController = (() => {
    class ScrewController {
    }
    ScrewController.getScrewList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.page) {
            return next(new HttpException_1.default(500, -1, "page不能为空！"));
        }
        if (!req.query.pageCount) {
            return next(new HttpException_1.default(500, -1, "pageCount不能为空！"));
        }
        screwEntity_1.default.findAndCountAll({
            limit: Number(req.query.pageCount),
            offset: Number(req.query.page) * Number(req.query.pageCount),
        }).then(result => {
            res.send(new HttpException_1.default(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    ScrewController.getScrewById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "id不能为空！"));
        }
        screwEntity_1.default.findOne({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException_1.default(200, 0, "调用成功", result));
            }
            else {
                next(new HttpException_1.default(500, -1, "弹簧不存在"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    ScrewController.createScrew = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        screwEntity_1.default.create(req.body).then(result => {
            res.send(new HttpException_1.default(200, 0, "新增成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    ScrewController.updateScrew = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "id不能为空！"));
        }
        screwEntity_1.default.update(req.query, {
            where: {
                id: req.query.id
            }
        }).then((result) => {
            if (result[0]) {
                res.send(new HttpException_1.default(200, 0, "修改成功", null));
            }
            else {
                next(new HttpException_1.default(500, -1, "弹簧不存在"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    ScrewController.deleteScrew = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "id不能为空！"));
        }
        screwEntity_1.default.destroy({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException_1.default(200, 0, "删除成功", null));
            }
            else {
                next(new HttpException_1.default(500, -1, "弹簧不存在"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    return ScrewController;
})();
exports.default = ScrewController;
