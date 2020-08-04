import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import Category from "../models/categoryEntity"

class CategoryController{

    /**
     * 获取所有分类列表
     */
    static getCategoryList = async (req: Request, res: Response, next: NextFunction) => {
        Category.findAll().then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 根据id获取分类
     */
    static getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Category.findOne({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "调用成功", result));
            } else {
                next(new HttpException(500, -1, "分类不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        });
    }

    /**
     * 新增分类
     */
    static createCategory = async (req: Request, res: Response, next: NextFunction) => {
        Category.create(req.query).then(result => {
            res.send(new HttpException(200, 0, "新增成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 更新分类
     */
    static updateCategory = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Category.update(req.query, {
            where: {
                id: req.query.id
            }
        }).then((result: any) => {
            if (result[0]) {
                res.send(new HttpException(200, 0, "修改成功", null));
            } else {
                next(new HttpException(500, -1, "分类不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 删除分类
     */
    static deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Category.destroy({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "删除成功", null));
            } else {
                next(new HttpException(500, -1, "分类不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }
}

export default CategoryController