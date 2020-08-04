import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import Banner from "../models/bannerEntity"

class BannerController{

    /**
     * 获取所有轮播图列表
     */
    static getBannerList = async (req: Request, res: Response, next: NextFunction) => {
        Banner.findAll().then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 根据id获取轮播图
     */
    static getBannerById = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Banner.findOne({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "调用成功", result));
            } else {
                next(new HttpException(500, -1, "banner不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        });
    }

    /**
     * 新增轮播图
     */
    static createBanner = async (req: Request, res: Response, next: NextFunction) => {
        Banner.create(req.query).then(result => {
            res.send(new HttpException(200, 0, "新增成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 更新轮播图
     */
    static updateBanner = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Banner.update(req.query, {
            where: {
                id: req.query.id
            }
        }).then((result: any) => {
            if (result[0]) {
                res.send(new HttpException(200, 0, "修改成功", null));
            } else {
                next(new HttpException(500, -1, "banner不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 删除轮播图
     */
    static deleteBanner = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Banner.destroy({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "删除成功", null));
            } else {
                next(new HttpException(500, -1, "banner不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }
}

export default BannerController