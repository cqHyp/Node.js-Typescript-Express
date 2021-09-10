import {Request, Response, NextFunction} from "express";
import HttpException from "../exceptions/HttpException";
import tRequestsDistributionEntity from "../models/tRequestsDistributionEntity"
import BaseController from "./baseController";
import User from "../models/userEntity";
import tReportSum from "../models/tReportSum";
import tBugsDistributionBEntity from "../models/tBugsDistributionBEntity";
import tBugsDistributionAEntity from "../models/tBugsDistributionAEntity";
import tBugsWontfix from "../models/tBugsWontfix";

class tIterationController {

    static listAll = async (req: Request, res: Response, next: NextFunction) => {
        tRequestsDistributionEntity.findAll().then(result => {
            res.send(new HttpException(200, 0, "调用成功", result));
        }).catch(error => {
            next(new HttpException(500, -1, error));
        })
    }

    /**
     * 生成测试报告
     * @param req
     * @param res
     * @param next
     */
    static createReport = async (req: Request, res: Response, next: NextFunction) => {
        await tReportSum.create({
            summary: req.body.summary,
            comment: req.body.comment,
            iteration: req.body.iteration,
            importdate: new Date(),
            importperson: req.header("x-token")
        })

        let distributionList = JSON.parse(req.body.distributionData);
        distributionList.forEach(item => {
            item.importdate = new Date();
            item.importperson = req.header("x-token");
            item.iteration = req.body.iteration;
        })
        await tRequestsDistributionEntity.bulkCreate(distributionList);

        let distributionAList = JSON.parse(req.body.distributionAData);
        distributionAList.forEach(item => {
            item.importdate = new Date();
            item.importperson = req.header("x-token");
            item.iteration = req.body.iteration;
        })
        await tBugsDistributionAEntity.bulkCreate(distributionAList);

        let distributionBList = JSON.parse(req.body.distributionBData);
        distributionBList.forEach(item => {
            item.importdate = new Date();
            item.importperson = req.header("x-token");
            item.iteration = req.body.iteration;
        })
        await tBugsDistributionBEntity.bulkCreate(distributionBList);

        let wontFixList = JSON.parse(req.body.wontFixList);
        wontFixList.forEach(item => {
            item.importdate = new Date();
            item.importperson = req.header("x-token");
            item.iteration = req.body.iteration;
        })
        await tBugsWontfix.bulkCreate(wontFixList);
        res.send(new HttpException(200, 0, "调用成功"));
    }
}

export default tIterationController;
