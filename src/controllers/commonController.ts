import {Request, Response, NextFunction, query} from "express";
import HttpException from "../exceptions/HttpException";
import BaseController from "./baseController";
import * as moment from "moment";
import tDailyA from "../models/tdailyaEntity";

class commonController {

    /**
     * 获取功能模块列表
     * @param req
     * @param res
     * @param next
     */
    static getModuleList = async (req: Request, res: Response, next: NextFunction) => {
        let moduleList = ["制造管理", "设备维保", "模具维保", "质量管理", "点检管理", "报表分析", "工艺管理", "基础资料", "指标督导", "系统管理", "全场呼叫", "监控中心", "程序管理", "其它"];
        res.send(new HttpException(200, 0, "调用成功", moduleList));
    }

    /**
     * 获取需求分类列表
     * @param req
     * @param res
     * @param next
     */
    static getTaskType = async (req: Request, res: Response, next: NextFunction) => {
        let taskType = ["产品类" , "优化类" , "技术类" , "接口类" , "未分类"]
        res.send(new HttpException(200, 0, "调用成功", taskType));
    }

    /**
     * 获取终端分类列表
     * @param req
     * @param res
     * @param next
     */
    static getDeviceType = async (req: Request, res: Response, next: NextFunction) => {
        let deviceType = ["WEB" , "IOS" , "Android" , "TV" , "Terminal"];
        res.send(new HttpException(200, 0, "调用成功", deviceType));
    }

    /**
     * 获取严重程度列表
     * @param req
     * @param res
     * @param next
     */
    static getSeverityList = async (req: Request, res: Response, next: NextFunction) => {
        let severityList = ["致命" , "严重" , "一般" , "轻微"];
        res.send(new HttpException(200, 0, "调用成功", severityList));
    }

    /**
     * 获取缺陷分布类型
     * @param req
     * @param res
     * @param next
     */
    static getDistributionList = async (req: Request, res: Response, next: NextFunction) => {
        let severityList = ["数据" , "功能" , "界面" , "其他"];
        res.send(new HttpException(200, 0, "调用成功", severityList));
    }
}

export default commonController
