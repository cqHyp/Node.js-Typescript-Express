import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import Screw from "../models/screwEntity";

class ScrewController {
    
    /**
     * 分页查找所有弹簧
     * @param page pageCount
     * @returns 弹簧列表
     */
    static getScrewList = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.page) {
            return next(new HttpException(500, -1, "page不能为空！"));
        }
        if (!req.query.pageCount) {
            return next(new HttpException(500, -1, "pageCount不能为空！"));
        }
        Screw.findAndCountAll({
            limit: Number(req.query.pageCount),
            offset: Number(req.query.page) * Number(req.query.pageCount),
        }).then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 根据id获取弹簧
     * @param 弹簧id
     * @returns 弹簧详情
     */
    static getScrewById = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Screw.findOne({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "调用成功", result));
            } else {
                next(new HttpException(500, -1, "弹簧不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        });
    }

    /**
     * 新增弹簧
     */
    static createScrew = async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);
        Screw.create(req.body).then(result => {
            res.send(new HttpException(200, 0, "新增成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 更新弹簧信息
     */
    static updateScrew = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Screw.update(req.query, {
            where: {
                id: req.query.id
            }
        }).then((result: any) => {
            if (result[0]) {
                res.send(new HttpException(200, 0, "修改成功", null));
            } else {
                next(new HttpException(500, -1, "弹簧不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

     /**
     * 删除弹簧
     */
    static deleteScrew = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Screw.destroy({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "删除成功", null));
            } else {
                next(new HttpException(500, -1, "弹簧不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }
}

export default ScrewController