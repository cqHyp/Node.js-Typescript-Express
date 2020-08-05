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
const productEntity_1 = require("../models/productEntity");
const categoryEntity_1 = require("../models/categoryEntity");
let ProductController = (() => {
    class ProductController {
    }
    ProductController.getProductList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.page) {
            return next(new HttpException_1.default(500, -1, "page不能为空！"));
        }
        if (!req.query.pageCount) {
            return next(new HttpException_1.default(500, -1, "pageCount不能为空！"));
        }
        let condition = req.query.category ? { category: req.query.category } : {};
        productEntity_1.default.findAndCountAll({
            where: Object.assign({}, condition),
            limit: Number(req.query.pageCount),
            offset: Number(req.query.page) * Number(req.query.pageCount),
            include: [
                { model: categoryEntity_1.default, as: "Category" },
            ]
        }).then(result => {
            res.send(new HttpException_1.default(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    ProductController.getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "id不能为空！"));
        }
        productEntity_1.default.findOne({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException_1.default(200, 0, "调用成功", result));
            }
            else {
                next(new HttpException_1.default(500, -1, "商品不存在"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    ProductController.createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        productEntity_1.default.create(req.query).then(result => {
            res.send(new HttpException_1.default(200, 0, "新增成功", result));
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    ProductController.updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "id不能为空！"));
        }
        productEntity_1.default.update(req.query, {
            where: {
                id: req.query.id
            }
        }).then((result) => {
            if (result[0]) {
                res.send(new HttpException_1.default(200, 0, "修改成功", null));
            }
            else {
                next(new HttpException_1.default(500, -1, "商品不存在"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    ProductController.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.query.id) {
            return next(new HttpException_1.default(500, -1, "id不能为空！"));
        }
        productEntity_1.default.destroy({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException_1.default(200, 0, "删除成功", null));
            }
            else {
                next(new HttpException_1.default(500, -1, "商品不存在"));
            }
        }).catch(error => {
            next(new HttpException_1.default(500, -1, error));
        });
    });
    return ProductController;
})();
exports.default = ProductController;
