import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import Product from "../models/productEntity";
import Category from "../models/categoryEntity";

class ProductController {


    /**
     * 分页查找所有商品
     * @param page pageCount
     * @returns 商品列表
     */
    static getProductList = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.page) {
            return next(new HttpException(500, -1, "page不能为空！"));
        }
        if (!req.query.pageCount) {
            return next(new HttpException(500, -1, "pageCount不能为空！"));
        }
        let condition = req.query.category ? { category: req.query.category } : {};
        Product.findAndCountAll({
            where: {
                ...condition,
                  
            },
            limit: Number(req.query.pageCount),
            offset: Number(req.query.page) * Number(req.query.pageCount),
            include: [
                { model: Category, as: "Category" },
            ]
        }).then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 根据id获取商品
     * @param 商品id
     * @returns 商品详情
     */
    static getProductById = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Product.findOne({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "调用成功", result));
            } else {
                next(new HttpException(500, -1, "商品不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        });
    }

    /**
     * 新增商品
     */
    static createProduct = async (req: Request, res: Response, next: NextFunction) => {
        Product.create(req.query).then(result => {
            res.send(new HttpException(200, 0, "新增成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 更新商品信息
     */
    static updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Product.update(req.query, {
            where: {
                id: req.query.id
            }
        }).then((result: any) => {
            if (result[0]) {
                res.send(new HttpException(200, 0, "修改成功", null));
            } else {
                next(new HttpException(500, -1, "商品不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 删除商品
     */
    static deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.query.id) {
            return next(new HttpException(500, -1, "id不能为空！"));
        }
        Product.destroy({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if (result) {
                res.send(new HttpException(200, 0, "删除成功", null));
            } else {
                next(new HttpException(500, -1, "商品不存在"));
            }
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }
}

export default ProductController