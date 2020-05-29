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
const user_model_1 = require("../models/user.model");
const HttpException_1 = require("../exceptions/HttpException");
let UserController = (() => {
    class UserController {
    }
    UserController.listAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.find({}, (err, allInfo) => {
            if (err) {
                next(new HttpException_1.default(500, -1, "系统错误"));
            }
            else {
                res.send(new HttpException_1.default(200, 0, "调用成功", allInfo));
            }
        });
    });
    UserController.getOneById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.findById(req.query.id, (err, allInfo) => {
            if (err) {
                next(new HttpException_1.default(500, -1, "系统错误"));
            }
            else {
                res.send(new HttpException_1.default(200, 0, "调用成功", allInfo));
            }
        });
    });
    UserController.newUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let newUser = new user_model_1.default(req.body);
        newUser.save((err, info) => {
            if (err) {
                next(new HttpException_1.default(500, -1, err));
            }
            else {
                res.send(new HttpException_1.default(200, 0, "调用成功", info));
            }
        });
    });
    UserController.editUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.findByIdAndUpdate({ _id: req.query.id, }, req.body, (err, result) => {
            if (err) {
                next(new HttpException_1.default(500, -1, "系统错误"));
            }
            else {
                res.send(new HttpException_1.default(200, 0, "调用成功", result));
            }
        });
    });
    UserController.delUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        user_model_1.default.remove({ _id: req.query.id }, (err) => {
            if (err) {
                next(new HttpException_1.default(500, -1, "系统错误"));
            }
            else {
                res.send(new HttpException_1.default(200, 0, "调用成功", null));
            }
        });
    });
    return UserController;
})();
exports.default = UserController;
